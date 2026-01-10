import { Injectable } from "@nestjs/common";
import { MinioService } from "../../shared/minio/minio.service";
import * as crypto from "crypto";
import * as path from "path";

@Injectable()
export class FilesService {
  constructor(private readonly minioService: MinioService) {}

  async uploadPublicFile(file: Express.Multer.File): Promise<{ url: string; key: string }> {
    const bucket = this.minioService.getPublicBucket();

    // Generate object key: games/YYYY/MM/DD/uuid.ext
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const uuid = crypto.randomUUID();
    const ext = path.extname(file.originalname);
    const objectKey = `games/${year}/${month}/${day}/${uuid}${ext}`;

    // Upload to MinIO
    await this.minioService.uploadFile(bucket, objectKey, file.buffer, {
      "Content-Type": file.mimetype,
      "Original-Name": file.originalname,
    });

    // Use MinioService to get public URL (external-facing)
    const url = this.minioService.getPublicUrl(objectKey);

    return {
      url,
      key: objectKey,
    };
  }

  async uploadCheatImage(file: Express.Multer.File): Promise<{ url: string; key: string }> {
    const bucket = this.minioService.getPublicBucket();

    // Generate object key: cheats/YYYY/MM/DD/uuid.ext
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const uuid = crypto.randomUUID();
    const ext = path.extname(file.originalname);
    const objectKey = `cheats/${year}/${month}/${day}/${uuid}${ext}`;

    // Upload to MinIO
    await this.minioService.uploadFile(bucket, objectKey, file.buffer, {
      "Content-Type": file.mimetype,
      "Original-Name": file.originalname,
    });

    // Use MinioService to get public URL (external-facing)
    const url = this.minioService.getPublicUrl(objectKey);

    return {
      url,
      key: objectKey,
    };
  }
}
