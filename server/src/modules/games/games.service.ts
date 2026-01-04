import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../shared/prisma/prisma.service";
import { MinioService } from "../../shared/minio/minio.service";
import { CreateGameDto } from "./dto/create-game.dto";
import { UpdateGameDto } from "./dto/update-game.dto";
import { GameResponseDto } from "./dto/game-response.dto";
import { GameWithCheatsResponseDto } from "./dto/game-with-cheats-response.dto";
import { CheatResponseDto } from "../cheats/dto/cheat-response.dto";

@Injectable()
export class GamesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly minioService: MinioService,
  ) {}

  async create(createGameDto: CreateGameDto): Promise<GameResponseDto> {
    const game = await this.prisma.game.create({
      data: {
        name: createGameDto.name,
        color: createGameDto.color,
        image: createGameDto.image,
        backgroundImage: createGameDto.backgroundImage,
        icon: createGameDto.icon,
      },
    });

    return this.mapToResponseDto(game);
  }

  async findAll(): Promise<GameResponseDto[]> {
    const games = await this.prisma.game.findMany({
      orderBy: { createdAt: "desc" },
    });

    return games.map((game) => this.mapToResponseDto(game));
  }

  async findOne(id: string): Promise<GameResponseDto> {
    const game = await this.prisma.game.findFirst({
      where: { id, deletedAt: null },
    });

    if (!game) {
      throw new NotFoundException(`Game with ID ${id} not found`);
    }

    return this.mapToResponseDto(game);
  }

  async findOneWithCheats(id: string): Promise<GameWithCheatsResponseDto> {
    const game = await this.prisma.game.findFirst({
      where: { id, deletedAt: null },
      include: {
        cheats: {
          where: { deletedAt: null },
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!game) {
      throw new NotFoundException(`Game with ID ${id} not found`);
    }

    const gameDto = this.mapToResponseDto(game);
    const cheats = game.cheats.map((cheat) => this.mapCheatToResponseDto(cheat, game.name));

    return {
      ...gameDto,
      cheats,
    };
  }

  async findAllWithCheats(): Promise<GameWithCheatsResponseDto[]> {
    const games = await this.prisma.game.findMany({
      where: { deletedAt: null },
      include: {
        cheats: {
          where: { deletedAt: null },
          orderBy: { createdAt: "desc" },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return games.map((game) => {
      const gameDto = this.mapToResponseDto(game);
      const cheats = game.cheats.map((cheat) => this.mapCheatToResponseDto(cheat, game.name));

      return {
        ...gameDto,
        cheats,
      };
    });
  }

  async search(query: string): Promise<GameWithCheatsResponseDto[]> {
    if (!query || query.trim().length === 0) {
      return [];
    }

    const searchQuery = query.trim().toLowerCase();

    // Search games by name and cheats by name
    const games = await this.prisma.game.findMany({
      where: {
        deletedAt: null,
        OR: [
          {
            name: {
              contains: searchQuery,
              mode: "insensitive",
            },
          },
          {
            cheats: {
              some: {
                deletedAt: null,
                name: {
                  contains: searchQuery,
                  mode: "insensitive",
                },
              },
            },
          },
        ],
      },
      include: {
        cheats: {
          where: {
            deletedAt: null,
            OR: [
              {
                name: {
                  contains: searchQuery,
                  mode: "insensitive",
                },
              },
            ],
          },
          orderBy: { createdAt: "desc" },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    // Filter and sort results
    return games
      .map((game) => {
        const gameDto = this.mapToResponseDto(game);
        const cheats = game.cheats.map((cheat) => this.mapCheatToResponseDto(cheat, game.name));

        // If game name matches, include all cheats; otherwise only matching cheats
        const gameNameMatches = game.name.toLowerCase().includes(searchQuery);
        const filteredCheats = gameNameMatches
          ? cheats
          : cheats.filter((cheat) => cheat.name.toLowerCase().includes(searchQuery));

        return {
          ...gameDto,
          cheats: filteredCheats,
        };
      })
      .filter((game) => game.cheats.length > 0 || game.name.toLowerCase().includes(searchQuery))
      .sort((a, b) => {
        // Prioritize exact game name matches, then games with matching cheats
        const aGameMatch = a.name.toLowerCase() === searchQuery;
        const bGameMatch = b.name.toLowerCase() === searchQuery;
        if (aGameMatch && !bGameMatch) return -1;
        if (!aGameMatch && bGameMatch) return 1;

        const aStartsWith = a.name.toLowerCase().startsWith(searchQuery);
        const bStartsWith = b.name.toLowerCase().startsWith(searchQuery);
        if (aStartsWith && !bStartsWith) return -1;
        if (!aStartsWith && bStartsWith) return 1;

        return a.name.localeCompare(b.name);
      });
  }

  private mapCheatToResponseDto(cheat: any, gameName?: string): CheatResponseDto {
    return {
      id: cheat.id,
      gameId: cheat.gameId,
      gameName: gameName ?? "",
      name: cheat.name,
      brandName: cheat.brandName,
      title: cheat.title,
      description: cheat.description,
      descriptionMarkdown: cheat.descriptionMarkdown ?? undefined,
      circularText: cheat.circularText,
      image: cheat.image,
      circularImage: cheat.circularImage ?? undefined,
      backgroundImage: cheat.backgroundImage ?? undefined,
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

  async update(id: string, updateGameDto: UpdateGameDto): Promise<GameResponseDto> {
    const existingGame = await this.prisma.game.findFirst({
      where: { id, deletedAt: null },
    });

    if (!existingGame) {
      throw new NotFoundException(`Game with ID ${id} not found`);
    }

    const game = await this.prisma.game.update({
      where: { id },
      data: {
        ...(updateGameDto.name && { name: updateGameDto.name }),
        ...(updateGameDto.color && { color: updateGameDto.color }),
        ...(updateGameDto.image !== undefined && { image: updateGameDto.image }),
        ...(updateGameDto.backgroundImage !== undefined && {
          backgroundImage: updateGameDto.backgroundImage,
        }),
        ...(updateGameDto.icon !== undefined && { icon: updateGameDto.icon }),
      },
    });

    return this.mapToResponseDto(game);
  }

  private mapToResponseDto(game: any): GameResponseDto {
    return {
      id: game.id,
      name: game.name,
      color: game.color,
      // Transform internal MinIO URLs to public URLs
      image: this.minioService.transformToPublicUrl(game.image),
      backgroundImage: this.minioService.transformToPublicUrl(game.backgroundImage),
      icon: this.minioService.transformToPublicUrl(game.icon),
      createdAt: game.createdAt,
      updatedAt: game.updatedAt,
    };
  }
}
