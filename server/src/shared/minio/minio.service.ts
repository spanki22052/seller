import { Injectable, OnModuleInit, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Client } from "minio";
import { Readable } from "stream";

@Injectable()
export class MinioService implements OnModuleInit {
  private readonly logger = new Logger(MinioService.name);
  private readonly client: Client;
  private readonly publicBucket: string;
  private readonly privateBucket: string;
  private readonly mediaBucket: string;
  private readonly publicUrl: string;

  constructor(private readonly config: ConfigService) {
    const useSSLValue = this.config.get<string>("MINIO_USE_SSL");
    const useSSL = useSSLValue === "true" || useSSLValue === "1";

    const endpoint = this.config.getOrThrow<string>("MINIO_ENDPOINT");
    const port = parseInt(this.config.getOrThrow<string>("MINIO_PORT"), 10);
    const accessKeyRaw = this.config.getOrThrow<string>("MINIO_ACCESS_KEY");
    const secretKeyRaw = this.config.getOrThrow<string>("MINIO_SECRET_KEY");

    // Trim and validate credentials
    const accessKey = accessKeyRaw.trim();
    const secretKey = secretKeyRaw.trim();

    if (!accessKey || !secretKey) {
      throw new Error(
        "MinIO credentials are empty. Please check MINIO_ACCESS_KEY and MINIO_SECRET_KEY environment variables.",
      );
    }

    // Log configuration (without sensitive data)
    this.logger.log(`MinIO Configuration: endpoint=${endpoint}, port=${port}, useSSL=${useSSL}`);
    this.logger.log(
      `MinIO Credentials: accessKey length=${accessKey.length}, secretKey length=${secretKey.length}`,
    );
    this.logger.log(`MinIO AccessKey (first 3 chars): ${accessKey.substring(0, 3)}...`);

    // MinIO client configuration
    // Note: MinIO doesn't require region, so we don't pass it
    const clientConfig: any = {
      endPoint: endpoint,
      port: port,
      useSSL,
      accessKey: accessKey,
      secretKey: secretKey,
    };

    this.client = new Client(clientConfig);

    this.publicBucket = this.config.getOrThrow<string>("MINIO_BUCKET_PUBLIC");
    this.privateBucket = this.config.getOrThrow<string>("MINIO_BUCKET_PRIVATE");
    this.mediaBucket = this.config.get<string>("MINIO_BUCKET_MEDIA") || "media";

    // Get public URL for external access (defaults to localhost:9000 if not set)
    const publicUrl = this.config.get<string>("MINIO_PUBLIC_URL");
    if (publicUrl) {
      this.publicUrl = publicUrl.endsWith("/") ? publicUrl.slice(0, -1) : publicUrl;
    } else {
      const endpoint = this.config.get<string>("MINIO_ENDPOINT") || "localhost";
      const port = this.config.get<string>("MINIO_PORT") || "9000";
      const protocol = useSSL ? "https" : "http";
      this.publicUrl = `${protocol}://${endpoint === "minio" ? "localhost" : endpoint}:${port}`;
    }
  }

  async onModuleInit() {
    try {
      // Test connection by listing buckets
      const buckets = await this.client.listBuckets();
      this.logger.log(`MinIO connection successful. Found ${buckets.length} buckets.`);

      // Log bucket names for debugging
      if (buckets.length > 0) {
        this.logger.log(`Existing buckets: ${buckets.map((b) => b.name).join(", ")}`);
      }
    } catch (error: any) {
      this.logger.error("MinIO connection failed during initialization");
      this.logger.error(`Error message: ${error?.message || "Unknown error"}`);
      this.logger.error(`Error code: ${error?.code || "N/A"}`);

      // Don't throw here - let the app start, but log the error
      // The error will be caught when trying to upload
      this.logger.warn("MinIO connection test failed, but continuing startup. Uploads may fail.");
    }

    await this.ensureBucketsExist();
  }

  private async ensureBucketsExist() {
    const buckets = [this.publicBucket, this.privateBucket, this.mediaBucket];

    for (const bucket of buckets) {
      const exists = await this.client.bucketExists(bucket);
      if (!exists) {
        await this.client.makeBucket(bucket);
        this.logger.log(`Bucket '${bucket}' created`);

        // Set public policy for public bucket
        if (bucket === this.publicBucket) {
          const policy = {
            Version: "2012-10-17",
            Statement: [
              {
                Effect: "Allow",
                Principal: { AWS: ["*"] },
                Action: ["s3:GetObject"],
                Resource: [`arn:aws:s3:::${bucket}/*`],
              },
            ],
          };
          await this.client.setBucketPolicy(bucket, JSON.stringify(policy));
          this.logger.log(`Public policy set for bucket '${bucket}'`);
        }
      } else {
        this.logger.log(`Bucket '${bucket}' already exists`);
      }
    }
  }

  getClient(): Client {
    return this.client;
  }

  getPublicBucket(): string {
    return this.publicBucket;
  }

  getPrivateBucket(): string {
    return this.privateBucket;
  }

  getMediaBucket(): string {
    return this.mediaBucket;
  }

  async getPresignedUrl(bucket: string, objectName: string, expiry: number = 300): Promise<string> {
    return this.client.presignedGetObject(bucket, objectName, expiry);
  }

  async uploadFile(
    bucket: string,
    objectName: string,
    file: Buffer,
    metadata?: Record<string, string>,
  ): Promise<string> {
    try {
      // Ensure bucket exists before uploading
      const bucketExists = await this.client.bucketExists(bucket);
      if (!bucketExists) {
        await this.client.makeBucket(bucket);
        this.logger.log(`Bucket '${bucket}' created during upload`);
      }

      // Prepare metadata - try with minimal metadata first
      // Content-Type is important for file type detection
      const uploadMetadata: Record<string, string> = {};

      if (metadata && metadata["Content-Type"]) {
        uploadMetadata["Content-Type"] = String(metadata["Content-Type"]).trim();
      }

      // Convert Buffer to Stream using Readable.from()
      // This is critical - MinIO v8 has signature calculation issues with direct Buffer uploads
      const stream = Readable.from(file);

      // Upload with stream
      // The stream must be created before calling putObject to ensure proper signature calculation
      await this.client.putObject(bucket, objectName, stream, file.length, uploadMetadata);

      this.logger.log(
        `File uploaded successfully: ${bucket}/${objectName} (size: ${file.length} bytes)`,
      );
      return objectName;
    } catch (error: any) {
      this.logger.error(`Failed to upload file to ${bucket}/${objectName}:`);
      this.logger.error(`Error: ${error?.message || "Unknown error"}`);
      this.logger.error(`Error code: ${error?.code || "N/A"}`);

      // Additional debugging for signature errors
      if (error?.code === "SignatureDoesNotMatch") {
        const accessKey = this.config.get<string>("MINIO_ACCESS_KEY")?.trim() || "";
        const secretKey = this.config.get<string>("MINIO_SECRET_KEY")?.trim() || "";
        const endpoint = this.config.get<string>("MINIO_ENDPOINT") || "";
        const port = this.config.get<string>("MINIO_PORT") || "";

        this.logger.error("=== Signature Mismatch Debug Info ===");
        this.logger.error(`Endpoint: ${endpoint}:${port}`);
        this.logger.error(
          `AccessKey length: ${accessKey.length}, starts with: ${accessKey.substring(0, 3)}...`,
        );
        this.logger.error(`SecretKey length: ${secretKey.length}`);
        this.logger.error(
          "Verify credentials match MINIO_ROOT_USER and MINIO_ROOT_PASSWORD in MinIO container",
        );
        this.logger.error("Check for whitespace/newlines in .env file");
        this.logger.error("Ensure system clocks are synchronized");
      }

      throw error;
    }
  }

  async deleteFile(bucket: string, objectName: string): Promise<void> {
    await this.client.removeObject(bucket, objectName);
  }

  /**
   * Get public URL for a file in the public bucket
   * This URL is accessible from external clients (frontend)
   */
  getPublicUrl(objectKey: string): string {
    return `${this.publicUrl}/${this.publicBucket}/${objectKey}`;
  }

  /**
   * Transform internal MinIO URL to public URL
   * Handles URLs that use internal Docker service names (e.g., minio:9000)
   */
  transformToPublicUrl(url: string | null | undefined): string | undefined {
    if (!url) {
      return undefined;
    }

    // If URL already uses the public URL, return as-is
    if (url.startsWith(this.publicUrl)) {
      return url;
    }

    // Extract object key from URL (handles both internal and external formats)
    // Pattern: //host/bucket/objectKey or //host/public/bucket/objectKey
    const urlPattern = /\/\/[^\/]+\/([^\/]+\/.+)$/;
    const match = url.match(urlPattern);

    if (match && match[1]) {
      let objectKey = match[1];

      // If the extracted path starts with the bucket name, remove it
      // This handles URLs like: http://minio:9000/public/games/...
      // where we want to extract just "games/..." not "public/games/..."
      if (objectKey.startsWith(`${this.publicBucket}/`)) {
        objectKey = objectKey.substring(this.publicBucket.length + 1);
      }

      return this.getPublicUrl(objectKey);
    }

    // If pattern doesn't match, return original URL
    return url;
  }
}
