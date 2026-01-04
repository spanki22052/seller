import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  HttpCode,
  HttpStatus,
  BadRequestException,
  UseGuards,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiConsumes,
  ApiBody,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { FilesService } from "./files.service";
import { JwtAuthGuard } from "../../modules/auth/guards/jwt-auth.guard";

@ApiTags("files")
@Controller("files")
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post("upload")
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(
    FileInterceptor("file", {
      limits: {
        fileSize: 50 * 1024 * 1024, // 50MB
      },
    }),
  )
  @ApiOperation({ summary: "Upload a file to MinIO" })
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        file: {
          type: "string",
          format: "binary",
        },
        bucket: {
          type: "string",
          enum: ["public", "private", "media"],
          description: "Bucket type: public, private, or media",
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: "File uploaded successfully",
    schema: {
      type: "object",
      properties: {
        url: { type: "string" },
        key: { type: "string" },
      },
    },
  })
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<{ url: string; key: string }> {
    if (!file) {
      throw new BadRequestException("Файл не предоставлен");
    }

    // Validate file type and size based on file type
    const isVideo = file.mimetype === "video/mp4" || file.mimetype === "video/mpeg";
    const isImage = ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(file.mimetype);

    if (!isVideo && !isImage) {
      throw new BadRequestException(
        "Разрешены только изображения (JPEG, PNG, WebP) и видео (MP4, MPEG)",
      );
    }

    // Video files: 30MB limit
    if (isVideo) {
      const maxVideoSize = 30 * 1024 * 1024; // 30MB
      if (file.size > maxVideoSize) {
        throw new BadRequestException("Размер видео превышает лимит 30MB");
      }
    }

    // Image files: 4MB limit
    if (isImage) {
      const maxImageSize = 4 * 1024 * 1024; // 4MB
      if (file.size > maxImageSize) {
        throw new BadRequestException("Размер изображения превышает лимит 4MB");
      }
    }

    return this.filesService.uploadPublicFile(file);
  }

  @Post("upload/cheat-image")
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(
    FileInterceptor("file", {
      limits: {
        fileSize: 50 * 1024 * 1024, // 50MB
      },
    }),
  )
  @ApiOperation({ summary: "Upload a cheat image to MinIO" })
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        file: {
          type: "string",
          format: "binary",
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: "Cheat image uploaded successfully",
    schema: {
      type: "object",
      properties: {
        url: { type: "string" },
        key: { type: "string" },
      },
    },
  })
  async uploadCheatImage(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<{ url: string; key: string }> {
    if (!file) {
      throw new BadRequestException("Файл не предоставлен");
    }

    // Validate file size (4MB limit for images)
    const maxSize = 4 * 1024 * 1024; // 4MB
    if (file.size > maxSize) {
      throw new BadRequestException("Размер изображения превышает лимит 4MB");
    }

    // Validate file type (images only)
    const allowedMimeTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException("Разрешены только изображения (JPEG, PNG, WebP)");
    }

    return this.filesService.uploadCheatImage(file);
  }
}
