import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common";
import { PrismaService } from "../../shared/prisma/prisma.service";
import { MinioService } from "../../shared/minio/minio.service";
import { CreateCheatDto } from "./dto/create-cheat.dto";
import { UpdateCheatDto } from "./dto/update-cheat.dto";
import { BulkUpdateCheatStatusDto } from "./dto/bulk-update-cheat-status.dto";
import { CheatResponseDto } from "./dto/cheat-response.dto";

@Injectable()
export class CheatsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly minioService: MinioService,
  ) {}

  async create(createCheatDto: CreateCheatDto): Promise<CheatResponseDto> {
    // Verify game exists
    const game = await this.prisma.game.findFirst({
      where: { id: createCheatDto.gameId, deletedAt: null },
    });

    if (!game) {
      throw new BadRequestException(`Game with ID ${createCheatDto.gameId} not found`);
    }

    // Verify brand exists
    const brand = await this.prisma.brand.findFirst({
      where: { id: createCheatDto.brandId, deletedAt: null },
    });

    if (!brand) {
      throw new BadRequestException(`Brand with ID ${createCheatDto.brandId} not found`);
    }

    // Generate name from brand name if not provided
    const cheatName = createCheatDto.name || brand.name;

    const cheat = await this.prisma.cheat.create({
      data: {
        gameId: createCheatDto.gameId,
        brandId: createCheatDto.brandId,
        reviewDigitalSeller: createCheatDto.reviewDigitalSeller as any,
        name: cheatName,
        description:
          createCheatDto.description && createCheatDto.description.trim() !== ""
            ? createCheatDto.description
            : null,
        descriptionMarkdown:
          createCheatDto.descriptionMarkdown && createCheatDto.descriptionMarkdown.trim() !== ""
            ? createCheatDto.descriptionMarkdown
            : null,
        circularText:
          createCheatDto.circularText && createCheatDto.circularText.trim() !== ""
            ? createCheatDto.circularText
            : null,
        image:
          createCheatDto.image && createCheatDto.image.trim() !== "" ? createCheatDto.image : null,
        circularImage:
          createCheatDto.circularImage && createCheatDto.circularImage.trim() !== ""
            ? createCheatDto.circularImage
            : null,
        backgroundImage:
          createCheatDto.backgroundImage && createCheatDto.backgroundImage.trim() !== ""
            ? createCheatDto.backgroundImage
            : null,
        productName: createCheatDto.productName,
        windowsVersion:
          createCheatDto.windowsVersion && createCheatDto.windowsVersion.trim() !== ""
            ? createCheatDto.windowsVersion
            : null,
        gameVersion:
          createCheatDto.gameVersion && createCheatDto.gameVersion.trim() !== ""
            ? createCheatDto.gameVersion
            : null,
        gameMode:
          createCheatDto.gameMode && createCheatDto.gameMode.trim() !== ""
            ? createCheatDto.gameMode
            : null,
        processors:
          createCheatDto.processors && createCheatDto.processors.trim() !== ""
            ? createCheatDto.processors
            : null,
        supportedSystems:
          createCheatDto.supportedSystems && createCheatDto.supportedSystems.length > 0
            ? createCheatDto.supportedSystems
            : [],
        buttonText:
          createCheatDto.buttonText && createCheatDto.buttonText.trim() !== ""
            ? createCheatDto.buttonText
            : null,
        videoUrl:
          createCheatDto.videoUrl && createCheatDto.videoUrl.trim() !== ""
            ? createCheatDto.videoUrl
            : null,
        videoThumbnail:
          createCheatDto.videoThumbnail && createCheatDto.videoThumbnail.trim() !== ""
            ? createCheatDto.videoThumbnail
            : null,
        screenshots: createCheatDto.screenshots,
        price: createCheatDto.price as any,
        breadcrumbs: createCheatDto.breadcrumbs as any,
        functions: createCheatDto.functions as any,
        pricingPlans: createCheatDto.pricingPlans as any,
        isNew: createCheatDto.isNew ?? false,
        isComingSoon: createCheatDto.isComingSoon ?? false,
        status: createCheatDto.status ?? "AVAILABLE",
      },
      include: {
        game: {
          select: {
            name: true,
          },
        },
        brand: {
          select: {
            name: true,
          },
        },
      },
    });

    return this.mapToResponseDto(cheat);
  }

  async findAll(): Promise<CheatResponseDto[]> {
    const cheats = await this.prisma.cheat.findMany({
      where: {},
      orderBy: [
        { orderId: "asc" },
        { createdAt: "desc" }
      ],
      include: {
        game: {
          select: {
            name: true,
          },
        },
        brand: {
          select: {
            name: true,
          },
        },
      },
    });

    return cheats.map((cheat) => this.mapToResponseDto(cheat));
  }

  async findOne(id: string): Promise<CheatResponseDto> {
    const cheat = await this.prisma.cheat.findFirst({
      where: { id, deletedAt: null },
      include: {
        game: {
          select: {
            name: true,
          },
        },
        brand: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!cheat) {
      throw new NotFoundException(`Cheat with ID ${id} not found`);
    }

    return this.mapToResponseDto(cheat);
  }

  async update(id: string, updateCheatDto: UpdateCheatDto): Promise<CheatResponseDto> {
    const existingCheat = await this.prisma.cheat.findFirst({
      where: { id, deletedAt: null },
    });

    if (!existingCheat) {
      throw new NotFoundException(`Cheat with ID ${id} not found`);
    }

    // Verify game exists if gameId is being updated
    if (updateCheatDto.gameId) {
      const game = await this.prisma.game.findFirst({
        where: { id: updateCheatDto.gameId, deletedAt: null },
      });

      if (!game) {
        throw new BadRequestException(`Game with ID ${updateCheatDto.gameId} not found`);
      }
    }

    // Verify brand exists if brandId is being updated
    if (updateCheatDto.brandId) {
      const brand = await this.prisma.brand.findFirst({
        where: { id: updateCheatDto.brandId, deletedAt: null },
      });

      if (!brand) {
        throw new BadRequestException(`Brand with ID ${updateCheatDto.brandId} not found`);
      }
    }

    const updateData: any = {};

    if (updateCheatDto.gameId) updateData.gameId = updateCheatDto.gameId;
    if (updateCheatDto.brandId) updateData.brandId = updateCheatDto.brandId;
    if (updateCheatDto.reviewDigitalSeller !== undefined) {
      updateData.reviewDigitalSeller = updateCheatDto.reviewDigitalSeller as any;
    }
    if (updateCheatDto.name) updateData.name = updateCheatDto.name;
    if (updateCheatDto.description !== undefined) {
      updateData.description =
        updateCheatDto.description && updateCheatDto.description.trim() !== ""
          ? updateCheatDto.description
          : null;
    }
    if (updateCheatDto.descriptionMarkdown !== undefined) {
      updateData.descriptionMarkdown =
        updateCheatDto.descriptionMarkdown && updateCheatDto.descriptionMarkdown.trim() !== ""
          ? updateCheatDto.descriptionMarkdown
          : null;
    }
    if (updateCheatDto.seoText !== undefined) {
      updateData.seoText =
        updateCheatDto.seoText && updateCheatDto.seoText.trim() !== ""
          ? updateCheatDto.seoText
          : null;
    }
    if (updateCheatDto.circularText) updateData.circularText = updateCheatDto.circularText;
    if (updateCheatDto.image !== undefined) {
      updateData.image =
        updateCheatDto.image && updateCheatDto.image.trim() !== "" ? updateCheatDto.image : null;
    }
    if (updateCheatDto.circularImage !== undefined) {
      updateData.circularImage = updateCheatDto.circularImage ?? null;
    }
    if (updateCheatDto.backgroundImage !== undefined) {
      updateData.backgroundImage = updateCheatDto.backgroundImage ?? null;
    }
    if (updateCheatDto.productName) updateData.productName = updateCheatDto.productName;
    if (updateCheatDto.windowsVersion) updateData.windowsVersion = updateCheatDto.windowsVersion;
    if (updateCheatDto.gameVersion) updateData.gameVersion = updateCheatDto.gameVersion;
    if (updateCheatDto.gameMode) updateData.gameMode = updateCheatDto.gameMode;
    if (updateCheatDto.processors) updateData.processors = updateCheatDto.processors;
    if (updateCheatDto.supportedSystems !== undefined) {
      updateData.supportedSystems =
        updateCheatDto.supportedSystems && updateCheatDto.supportedSystems.length > 0
          ? updateCheatDto.supportedSystems
          : [];
    }
    if (updateCheatDto.buttonText) updateData.buttonText = updateCheatDto.buttonText;
    if (updateCheatDto.videoUrl !== undefined) updateData.videoUrl = updateCheatDto.videoUrl;
    if (updateCheatDto.videoThumbnail !== undefined)
      updateData.videoThumbnail = updateCheatDto.videoThumbnail;
    if (updateCheatDto.screenshots !== undefined) {
      updateData.screenshots = updateCheatDto.screenshots;
    }
    if (updateCheatDto.price) updateData.price = updateCheatDto.price as any;
    if (updateCheatDto.breadcrumbs) updateData.breadcrumbs = updateCheatDto.breadcrumbs as any;
    if (updateCheatDto.functions !== undefined) {
      updateData.functions = updateCheatDto.functions as any;
    }
    if (updateCheatDto.pricingPlans !== undefined) {
      updateData.pricingPlans = updateCheatDto.pricingPlans as any;
    }
    if (updateCheatDto.isNew !== undefined) updateData.isNew = updateCheatDto.isNew;
    if (updateCheatDto.isComingSoon !== undefined)
      updateData.isComingSoon = updateCheatDto.isComingSoon;
    if (updateCheatDto.status !== undefined) updateData.status = updateCheatDto.status;

    const cheat = await this.prisma.cheat.update({
      where: { id },
      data: updateData,
      include: {
        game: {
          select: {
            name: true,
          },
        },
        brand: {
          select: {
            name: true,
          },
        },
      },
    });

    return this.mapToResponseDto(cheat);
  }

  async remove(id: string): Promise<void> {
    const existingCheat = await this.prisma.cheat.findFirst({
      where: { id, deletedAt: null },
    });

    if (!existingCheat) {
      throw new NotFoundException(`Cheat with ID ${id} not found`);
    }

    // Soft delete the cheat
    await this.prisma.cheat.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async duplicate(id: string): Promise<CheatResponseDto> {
    const existingCheat = await this.prisma.cheat.findFirst({
      where: { id, deletedAt: null },
    });

    if (!existingCheat) {
      throw new NotFoundException(`Cheat with ID ${id} not found`);
    }

    // Create a duplicate with new ID and DRAFT status
    const duplicatedCheat = await this.prisma.cheat.create({
      data: {
        gameId: existingCheat.gameId,
        brandId: existingCheat.brandId,
        name: `${existingCheat.name} (Copy)`,
        description: existingCheat.description,
        descriptionMarkdown: existingCheat.descriptionMarkdown,
        seoText: existingCheat.seoText,
        circularText: existingCheat.circularText,
        image: existingCheat.image,
        circularImage: existingCheat.circularImage,
        backgroundImage: existingCheat.backgroundImage,
        productName: existingCheat.productName,
        windowsVersion: existingCheat.windowsVersion,
        gameVersion: existingCheat.gameVersion,
        gameMode: existingCheat.gameMode,
        processors: existingCheat.processors,
        supportedSystems: existingCheat.supportedSystems,
        buttonText: existingCheat.buttonText,
        videoUrl: existingCheat.videoUrl,
        videoThumbnail: existingCheat.videoThumbnail,
        screenshots: existingCheat.screenshots as any,
        price: existingCheat.price as any,
        breadcrumbs: existingCheat.breadcrumbs as any,
        functions: existingCheat.functions as any,
        pricingPlans: existingCheat.pricingPlans as any,
        isNew: existingCheat.isNew,
        isComingSoon: existingCheat.isComingSoon,
        status: "DRAFT", // Always create as draft
      },
      include: {
        game: {
          select: {
            name: true,
          },
        },
        brand: {
          select: {
            name: true,
          },
        },
      },
    });

    return this.mapToResponseDto(duplicatedCheat);
  }

  async bulkUpdateStatus(bulkUpdateDto: BulkUpdateCheatStatusDto): Promise<CheatResponseDto[]> {
    // First, verify all cheats exist
    const existingCheats = await this.prisma.cheat.findMany({
      where: {
        id: { in: bulkUpdateDto.ids },
        deletedAt: null,
      },
      select: { id: true },
    });

    const existingCheatIds = existingCheats.map((cheat) => cheat.id);
    const missingIds = bulkUpdateDto.ids.filter((id) => !existingCheatIds.includes(id));

    if (missingIds.length > 0) {
      throw new NotFoundException(`Cheats with IDs ${missingIds.join(", ")} not found`);
    }

    // Use a transaction to update all cheats atomically
    const updatedCheats = await this.prisma.$transaction(async (tx) => {
      // Update all cheats with the new status
      await tx.cheat.updateMany({
        where: {
          id: { in: bulkUpdateDto.ids },
          deletedAt: null,
        },
        data: {
          status: bulkUpdateDto.status,
          updatedAt: new Date(),
        },
      });

      // Fetch the updated cheats with relations for response mapping
      const cheats = await tx.cheat.findMany({
        where: {
          id: { in: bulkUpdateDto.ids },
          deletedAt: null,
        },
        include: {
          game: {
            select: {
              name: true,
            },
          },
          brand: {
            select: {
              name: true,
            },
          },
        },
      });

      return cheats;
    });

    return updatedCheats.map((cheat) => this.mapToResponseDto(cheat));
  }

  async reorderCheats(cheatIds: string[]): Promise<CheatResponseDto[]> {
    // First, verify all cheats exist
    const existingCheats = await this.prisma.cheat.findMany({
      where: {
        id: { in: cheatIds },
        deletedAt: null,
      },
      select: { id: true },
    });

    const existingCheatIds = existingCheats.map((cheat) => cheat.id);
    const missingIds = cheatIds.filter((id) => !existingCheatIds.includes(id));

    if (missingIds.length > 0) {
      throw new NotFoundException(`Cheats with IDs ${missingIds.join(", ")} not found`);
    }

    // Use a transaction to update all cheats order atomically
    const updatedCheats = await this.prisma.$transaction(async (tx) => {
      // Update each cheat with its new orderId
      const updatePromises = cheatIds.map((cheatId, index) =>
        tx.cheat.update({
          where: { id: cheatId },
          data: {
            orderId: index,
            updatedAt: new Date(),
          },
        })
      );

      await Promise.all(updatePromises);

      // Fetch the updated cheats with relations for response mapping
      const cheats = await tx.cheat.findMany({
        where: {
          id: { in: cheatIds },
          deletedAt: null,
        },
        orderBy: { orderId: "asc" },
        include: {
          game: {
            select: {
              name: true,
            },
          },
          brand: {
            select: {
              name: true,
            },
          },
        },
      });

      return cheats;
    });

    return updatedCheats.map((cheat) => this.mapToResponseDto(cheat));
  }

  private mapToResponseDto(cheat: any): CheatResponseDto {
    return {
      id: cheat.id,
      gameId: cheat.gameId,
      gameName: cheat.game?.name ?? "",
      name: cheat.name,
      brandName: cheat.brand?.name ?? "",
      reviewDigitalSeller: cheat.reviewDigitalSeller ? (cheat.reviewDigitalSeller as any) : undefined,
      description: cheat.description,
      descriptionMarkdown: cheat.descriptionMarkdown ?? undefined,
      seoText: cheat.seoText ?? undefined,
      circularText: cheat.circularText,
      image: this.minioService.transformToPublicUrl(cheat.image),
      circularImage: this.minioService.transformToPublicUrl(cheat.circularImage),
      backgroundImage: this.minioService.transformToPublicUrl(cheat.backgroundImage),
      price: cheat.price as any,
      productName: cheat.productName,
      windowsVersion: cheat.windowsVersion,
      gameVersion: cheat.gameVersion,
      gameMode: cheat.gameMode,
      processors: cheat.processors,
      supportedSystems: cheat.supportedSystems ?? [],
      buttonText: cheat.buttonText,
      breadcrumbs: cheat.breadcrumbs as any,
      videoUrl: cheat.videoUrl ?? undefined,
      videoThumbnail: cheat.videoThumbnail ?? undefined,
      screenshots: cheat.screenshots ? (cheat.screenshots as any) : undefined,
      functions: cheat.functions ? (cheat.functions as any) : undefined,
      pricingPlans: cheat.pricingPlans ? (cheat.pricingPlans as any) : undefined,
      isNew: cheat.isNew ?? undefined,
      isComingSoon: cheat.isComingSoon ?? undefined,
      status: cheat.status,
      createdAt: cheat.createdAt,
      updatedAt: cheat.updatedAt,
    };
  }
}
