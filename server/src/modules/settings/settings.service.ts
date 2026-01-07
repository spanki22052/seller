import { Injectable, NotFoundException } from "@nestjs/common";
import { Prisma } from "@prisma/client";
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
        data: {
          footerLinks: [
            { label: "Задать вопрос", href: "#" },
            { label: "Discord", href: "#" },
            { label: "Telegram", href: "#" },
          ],
        },
      });
    }

    return this.mapToResponseDto(settings);
  }

  async updateSettings(updateSettingsDto: UpdateSettingsDto): Promise<SettingsResponseDto> {
    let settings = await this.prisma.settings.findFirst({
      orderBy: { createdAt: "desc" },
    });

    // Подготовка данных для обновления
    const updateData: any = {};

    if (updateSettingsDto.howToBuyVideoUrl !== undefined) {
      updateData.howToBuyVideoUrl = updateSettingsDto.howToBuyVideoUrl;
    }
    if (updateSettingsDto.howToBuyVideoThumbnail !== undefined) {
      updateData.howToBuyVideoThumbnail = updateSettingsDto.howToBuyVideoThumbnail;
    }
    if (updateSettingsDto.gameIdsForIcons !== undefined) {
      updateData.gameIdsForIcons = updateSettingsDto.gameIdsForIcons;
    }
    if (updateSettingsDto.gameIdsForCarousel !== undefined) {
      updateData.gameIdsForCarousel = updateSettingsDto.gameIdsForCarousel;
    }
    // Явная обработка footerLinks - проверяем на null и undefined
    // Пустой массив [] тоже валидное значение, поэтому проверяем только на undefined и null
    if (updateSettingsDto.footerLinks !== undefined && updateSettingsDto.footerLinks !== null) {
      updateData.footerLinks = updateSettingsDto.footerLinks as unknown as Prisma.InputJsonValue;
    }
    if (updateSettingsDto.supportLink !== undefined) {
      updateData.supportLink = updateSettingsDto.supportLink;
    }

    // Если настроек нет, создаем их
    if (!settings) {
      settings = await this.prisma.settings.create({
        data: {
          howToBuyVideoUrl: updateSettingsDto.howToBuyVideoUrl,
          howToBuyVideoThumbnail: updateSettingsDto.howToBuyVideoThumbnail,
          gameIdsForIcons: updateSettingsDto.gameIdsForIcons,
          gameIdsForCarousel: updateSettingsDto.gameIdsForCarousel,
          footerLinks: updateSettingsDto.footerLinks
            ? (updateSettingsDto.footerLinks as unknown as Prisma.InputJsonValue)
            : Prisma.JsonNull,
          supportLink: updateSettingsDto.supportLink,
        },
      });
    } else {
      settings = await this.prisma.settings.update({
        where: { id: settings.id },
        data: updateData,
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
      gameIdsForIcons: settings.gameIdsForIcons || [],
      gameIdsForCarousel: settings.gameIdsForCarousel || [],
      footerLinks: settings.footerLinks || [],
      supportLink: settings.supportLink,
      createdAt: settings.createdAt,
      updatedAt: settings.updatedAt,
    };
  }
}

