import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../shared/prisma/prisma.service";
import { MinioService } from "../../shared/minio/minio.service";
import { UpdateSettingsDto } from "./dto/update-settings.dto";
import { SettingsResponseDto } from "./dto/settings-response.dto";

@Injectable()
export class SettingsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly minioService: MinioService,
  ) {}

  async getSettings(): Promise<SettingsResponseDto> {
    let settings = await this.prisma.settings.findFirst({
      orderBy: { createdAt: "desc" },
    });

    // Если настроек нет, создаем дефолтные
    if (!settings) {
      settings = await this.prisma.settings.create({
        data: {},
      });
    }

    return this.mapToResponseDto(settings);
  }

  async updateSettings(updateSettingsDto: UpdateSettingsDto): Promise<SettingsResponseDto> {
    let settings = await this.prisma.settings.findFirst({
      orderBy: { createdAt: "desc" },
    });

    // Если настроек нет, создаем их
    if (!settings) {
      settings = await this.prisma.settings.create({
        data: {
          howToBuyVideoUrl: updateSettingsDto.howToBuyVideoUrl,
          howToBuyVideoThumbnail: updateSettingsDto.howToBuyVideoThumbnail,
        },
      });
    } else {
      settings = await this.prisma.settings.update({
        where: { id: settings.id },
        data: {
          ...(updateSettingsDto.howToBuyVideoUrl !== undefined && {
            howToBuyVideoUrl: updateSettingsDto.howToBuyVideoUrl,
          }),
          ...(updateSettingsDto.howToBuyVideoThumbnail !== undefined && {
            howToBuyVideoThumbnail: updateSettingsDto.howToBuyVideoThumbnail,
          }),
        },
      });
    }

    return this.mapToResponseDto(settings);
  }

  private mapToResponseDto(settings: any): SettingsResponseDto {
    return {
      id: settings.id,
      howToBuyVideoUrl: settings.howToBuyVideoUrl
        ? this.minioService.transformToPublicUrl(settings.howToBuyVideoUrl)
        : undefined,
      howToBuyVideoThumbnail: settings.howToBuyVideoThumbnail
        ? this.minioService.transformToPublicUrl(settings.howToBuyVideoThumbnail)
        : undefined,
      createdAt: settings.createdAt,
      updatedAt: settings.updatedAt,
    };
  }
}

