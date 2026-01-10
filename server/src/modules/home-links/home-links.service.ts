import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../shared/prisma/prisma.service";
import { CreateHomeLinkDto } from "./dto/create-home-link.dto";
import { UpdateHomeLinkDto } from "./dto/update-home-link.dto";
import { HomeLinkResponseDto } from "./dto/home-link-response.dto";

@Injectable()
export class HomeLinksService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createHomeLinkDto: CreateHomeLinkDto): Promise<HomeLinkResponseDto> {
    const homeLink = await this.prisma.homeLink.create({
      data: {
        title: createHomeLinkDto.title,
        url: createHomeLinkDto.url,
        description: createHomeLinkDto.description,
        isActive: createHomeLinkDto.isActive ?? true,
        sortOrder: createHomeLinkDto.sortOrder ?? 0,
      },
    });

    return this.mapToResponseDto(homeLink);
  }

  async findAll(): Promise<HomeLinkResponseDto[]> {
    const homeLinks = await this.prisma.homeLink.findMany({
      where: { deletedAt: null },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
    });

    return homeLinks.map((homeLink) => this.mapToResponseDto(homeLink));
  }

  async findActive(): Promise<HomeLinkResponseDto[]> {
    const homeLinks = await this.prisma.homeLink.findMany({
      where: {
        deletedAt: null,
        isActive: true,
      },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
    });

    return homeLinks.map((homeLink) => this.mapToResponseDto(homeLink));
  }

  async findOne(id: string): Promise<HomeLinkResponseDto> {
    const homeLink = await this.prisma.homeLink.findFirst({
      where: { id, deletedAt: null },
    });

    if (!homeLink) {
      throw new NotFoundException(`Home link with ID ${id} not found`);
    }

    return this.mapToResponseDto(homeLink);
  }

  async update(id: string, updateHomeLinkDto: UpdateHomeLinkDto): Promise<HomeLinkResponseDto> {
    const existingHomeLink = await this.prisma.homeLink.findFirst({
      where: { id, deletedAt: null },
    });

    if (!existingHomeLink) {
      throw new NotFoundException(`Home link with ID ${id} not found`);
    }

    const homeLink = await this.prisma.homeLink.update({
      where: { id },
      data: {
        title: updateHomeLinkDto.title,
        url: updateHomeLinkDto.url,
        description: updateHomeLinkDto.description,
        isActive: updateHomeLinkDto.isActive,
        sortOrder: updateHomeLinkDto.sortOrder,
      },
    });

    return this.mapToResponseDto(homeLink);
  }

  async remove(id: string): Promise<void> {
    const existingHomeLink = await this.prisma.homeLink.findFirst({
      where: { id, deletedAt: null },
    });

    if (!existingHomeLink) {
      throw new NotFoundException(`Home link with ID ${id} not found`);
    }

    // Soft delete the home link
    await this.prisma.homeLink.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  private mapToResponseDto(homeLink: any): HomeLinkResponseDto {
    return {
      id: homeLink.id,
      title: homeLink.title,
      url: homeLink.url,
      description: homeLink.description,
      isActive: homeLink.isActive,
      sortOrder: homeLink.sortOrder,
      createdAt: homeLink.createdAt,
      updatedAt: homeLink.updatedAt,
    };
  }
}
