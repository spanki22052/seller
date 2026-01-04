import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common";
import { PrismaService } from "../../shared/prisma/prisma.service";
import { MinioService } from "../../shared/minio/minio.service";
import { CreateCheatDto } from "./dto/create-cheat.dto";
import { UpdateCheatDto } from "./dto/update-cheat.dto";
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

    const cheat = await this.prisma.cheat.create({
      data: {
        gameId: createCheatDto.gameId,
        name: createCheatDto.name,
        brandName: createCheatDto.brandName,
        title: createCheatDto.title,
        description: createCheatDto.description && createCheatDto.description.trim() !== "" ? createCheatDto.description : null,
        descriptionMarkdown: createCheatDto.descriptionMarkdown && createCheatDto.descriptionMarkdown.trim() !== "" ? createCheatDto.descriptionMarkdown : null,
        circularText: createCheatDto.circularText && createCheatDto.circularText.trim() !== "" ? createCheatDto.circularText : null,
        image: createCheatDto.image && createCheatDto.image.trim() !== "" ? createCheatDto.image : null,
        circularImage: createCheatDto.circularImage && createCheatDto.circularImage.trim() !== "" ? createCheatDto.circularImage : null,
        backgroundImage: createCheatDto.backgroundImage && createCheatDto.backgroundImage.trim() !== "" ? createCheatDto.backgroundImage : null,
        productName: createCheatDto.productName,
        windowsVersion: createCheatDto.windowsVersion && createCheatDto.windowsVersion.trim() !== "" ? createCheatDto.windowsVersion : null,
        gameVersion: createCheatDto.gameVersion && createCheatDto.gameVersion.trim() !== "" ? createCheatDto.gameVersion : null,
        gameMode: createCheatDto.gameMode && createCheatDto.gameMode.trim() !== "" ? createCheatDto.gameMode : null,
        processors: createCheatDto.processors && createCheatDto.processors.trim() !== "" ? createCheatDto.processors : null,
        supportedSystems: createCheatDto.supportedSystems && createCheatDto.supportedSystems.length > 0 ? createCheatDto.supportedSystems : [],
        buttonText: createCheatDto.buttonText && createCheatDto.buttonText.trim() !== "" ? createCheatDto.buttonText : null,
        videoUrl: createCheatDto.videoUrl && createCheatDto.videoUrl.trim() !== "" ? createCheatDto.videoUrl : null,
        videoThumbnail: createCheatDto.videoThumbnail && createCheatDto.videoThumbnail.trim() !== "" ? createCheatDto.videoThumbnail : null,
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
      },
    });

    return this.mapToResponseDto(cheat);
  }

  async findAll(): Promise<CheatResponseDto[]> {
    const cheats = await this.prisma.cheat.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        game: {
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

    const updateData: any = {};

    if (updateCheatDto.gameId) updateData.gameId = updateCheatDto.gameId;
    if (updateCheatDto.name) updateData.name = updateCheatDto.name;
    if (updateCheatDto.brandName) updateData.brandName = updateCheatDto.brandName;
    if (updateCheatDto.title) updateData.title = updateCheatDto.title;
    if (updateCheatDto.description !== undefined) {
      updateData.description = updateCheatDto.description && updateCheatDto.description.trim() !== "" ? updateCheatDto.description : null;
    }
    if (updateCheatDto.descriptionMarkdown !== undefined) {
      updateData.descriptionMarkdown = updateCheatDto.descriptionMarkdown && updateCheatDto.descriptionMarkdown.trim() !== "" ? updateCheatDto.descriptionMarkdown : null;
    }
    if (updateCheatDto.circularText) updateData.circularText = updateCheatDto.circularText;
    if (updateCheatDto.image !== undefined) {
      updateData.image = updateCheatDto.image && updateCheatDto.image.trim() !== "" ? updateCheatDto.image : null;
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
      updateData.supportedSystems = updateCheatDto.supportedSystems && updateCheatDto.supportedSystems.length > 0 ? updateCheatDto.supportedSystems : [];
    }
    if (updateCheatDto.buttonText) updateData.buttonText = updateCheatDto.buttonText;
    if (updateCheatDto.videoUrl !== undefined) updateData.videoUrl = updateCheatDto.videoUrl;
    if (updateCheatDto.videoThumbnail !== undefined) updateData.videoThumbnail = updateCheatDto.videoThumbnail;
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
    if (updateCheatDto.isComingSoon !== undefined) updateData.isComingSoon = updateCheatDto.isComingSoon;
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
      },
    });

    return this.mapToResponseDto(cheat);
  }

  private mapToResponseDto(cheat: any): CheatResponseDto {
    return {
      id: cheat.id,
      gameId: cheat.gameId,
      gameName: cheat.game?.name ?? "",
      name: cheat.name,
      brandName: cheat.brandName,
      title: cheat.title,
      description: cheat.description,
      descriptionMarkdown: cheat.descriptionMarkdown ?? undefined,
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

