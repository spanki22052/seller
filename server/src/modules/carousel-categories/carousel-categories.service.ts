import { Injectable, NotFoundException, ConflictException } from "@nestjs/common";
import { PrismaService } from "../../shared/prisma/prisma.service";
import { CreateCarouselCategoryDto } from "./dto/create-carousel-category.dto";
import { UpdateCarouselCategoryDto } from "./dto/update-carousel-category.dto";
import { CarouselCategoryResponseDto } from "./dto/carousel-category-response.dto";

@Injectable()
export class CarouselCategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createCarouselCategoryDto: CreateCarouselCategoryDto,
  ): Promise<CarouselCategoryResponseDto> {
    // Check if carousel category with this name already exists
    const existingCarouselCategory = await this.prisma.carouselCategory.findFirst({
      where: {
        name: createCarouselCategoryDto.name,
        deletedAt: null,
      },
    });

    if (existingCarouselCategory) {
      throw new ConflictException(
        `Carousel category with name "${createCarouselCategoryDto.name}" already exists`,
      );
    }

    const carouselCategory = await this.prisma.carouselCategory.create({
      data: {
        name: createCarouselCategoryDto.name,
      },
    });

    return this.mapToResponseDto(carouselCategory);
  }

  async findAll(): Promise<CarouselCategoryResponseDto[]> {
    const carouselCategories = await this.prisma.carouselCategory.findMany({
      where: { deletedAt: null },
      orderBy: { name: "asc" },
    });

    return carouselCategories.map((carouselCategory) => this.mapToResponseDto(carouselCategory));
  }

  async findOne(id: string): Promise<CarouselCategoryResponseDto> {
    const carouselCategory = await this.prisma.carouselCategory.findFirst({
      where: { id, deletedAt: null },
    });

    if (!carouselCategory) {
      throw new NotFoundException(`Carousel category with ID ${id} not found`);
    }

    return this.mapToResponseDto(carouselCategory);
  }

  async update(
    id: string,
    updateCarouselCategoryDto: UpdateCarouselCategoryDto,
  ): Promise<CarouselCategoryResponseDto> {
    const existingCarouselCategory = await this.prisma.carouselCategory.findFirst({
      where: { id, deletedAt: null },
    });

    if (!existingCarouselCategory) {
      throw new NotFoundException(`Carousel category with ID ${id} not found`);
    }

    // Check if new name conflicts with existing carousel category
    if (
      updateCarouselCategoryDto.name &&
      updateCarouselCategoryDto.name !== existingCarouselCategory.name
    ) {
      const nameConflict = await this.prisma.carouselCategory.findFirst({
        where: {
          name: updateCarouselCategoryDto.name,
          deletedAt: null,
        },
      });

      if (nameConflict) {
        throw new ConflictException(
          `Carousel category with name "${updateCarouselCategoryDto.name}" already exists`,
        );
      }
    }

    const carouselCategory = await this.prisma.carouselCategory.update({
      where: { id },
      data: {
        name: updateCarouselCategoryDto.name,
      },
    });

    return this.mapToResponseDto(carouselCategory);
  }

  async remove(id: string): Promise<void> {
    const existingCarouselCategory = await this.prisma.carouselCategory.findFirst({
      where: { id, deletedAt: null },
    });

    if (!existingCarouselCategory) {
      throw new NotFoundException(`Carousel category with ID ${id} not found`);
    }

    // Soft delete the carousel category
    await this.prisma.carouselCategory.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  private mapToResponseDto(carouselCategory: any): CarouselCategoryResponseDto {
    return {
      id: carouselCategory.id,
      name: carouselCategory.name,
      createdAt: carouselCategory.createdAt,
      updatedAt: carouselCategory.updatedAt,
    };
  }
}
