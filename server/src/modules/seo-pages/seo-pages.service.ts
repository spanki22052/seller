import { Injectable, BadRequestException } from "@nestjs/common";
import { Prisma, SeoPageType } from "@prisma/client";
import { PrismaService } from "../../shared/prisma/prisma.service";
import { UpdateSeoPageDto } from "./dto/update-seo-page.dto";
import { SeoPageResponseDto } from "./dto/seo-page-response.dto";

@Injectable()
export class SeoPagesService {
  constructor(private readonly prisma: PrismaService) {}

  private parsePageType(pageType: string): SeoPageType {
    const upperCase = pageType.toUpperCase() as keyof typeof SeoPageType;
    if (!(upperCase in SeoPageType)) {
      throw new BadRequestException(`Invalid page type: ${pageType}. Valid types are: home, games, faq`);
    }
    return SeoPageType[upperCase];
  }

  async findByPageType(pageType: string): Promise<SeoPageResponseDto | null> {
    const parsedPageType = this.parsePageType(pageType);
    const seoPage = await this.prisma.seoPage.findFirst({
      where: {
        pageType: parsedPageType,
        deletedAt: null,
      },
    });

    if (!seoPage) {
      return null;
    }

    return this.mapToResponseDto(seoPage);
  }

  async upsertByPageType(
    pageType: string,
    updateSeoPageDto: UpdateSeoPageDto,
  ): Promise<SeoPageResponseDto> {
    const parsedPageType = this.parsePageType(pageType);
    const seoPage = await this.prisma.seoPage.upsert({
      where: {
        pageType: parsedPageType,
      },
      update: {
        keywords: updateSeoPageDto.keywords,
      },
      create: {
        pageType: parsedPageType,
        keywords: updateSeoPageDto.keywords,
      },
    });

    return this.mapToResponseDto(seoPage);
  }

  async findAll(): Promise<SeoPageResponseDto[]> {
    const seoPages = await this.prisma.seoPage.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: "asc" },
    });

    return seoPages.map((seoPage) => this.mapToResponseDto(seoPage));
  }

  private mapToResponseDto(seoPage: any): SeoPageResponseDto {
    return {
      id: seoPage.id,
      pageType: seoPage.pageType,
      keywords: seoPage.keywords,
      createdAt: seoPage.createdAt,
      updatedAt: seoPage.updatedAt,
    };
  }
}
