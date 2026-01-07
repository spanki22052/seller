import { Injectable, NotFoundException, ConflictException } from "@nestjs/common";
import { PrismaService } from "../../shared/prisma/prisma.service";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { CategoryResponseDto } from "./dto/category-response.dto";

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<CategoryResponseDto> {
    // Check if category with this name already exists
    const existingCategory = await this.prisma.category.findFirst({
      where: {
        name: createCategoryDto.name,
        deletedAt: null,
      },
    });

    if (existingCategory) {
      throw new ConflictException(`Category with name "${createCategoryDto.name}" already exists`);
    }

    const category = await this.prisma.category.create({
      data: {
        name: createCategoryDto.name,
      },
    });

    return this.mapToResponseDto(category);
  }

  async findAll(): Promise<CategoryResponseDto[]> {
    const categories = await this.prisma.category.findMany({
      where: { deletedAt: null },
      orderBy: { name: "asc" },
    });

    return categories.map((category) => this.mapToResponseDto(category));
  }

  async findOne(id: string): Promise<CategoryResponseDto> {
    const category = await this.prisma.category.findFirst({
      where: { id, deletedAt: null },
    });

    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    return this.mapToResponseDto(category);
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<CategoryResponseDto> {
    const existingCategory = await this.prisma.category.findFirst({
      where: { id, deletedAt: null },
    });

    if (!existingCategory) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    // Check if new name conflicts with existing category
    if (updateCategoryDto.name && updateCategoryDto.name !== existingCategory.name) {
      const nameConflict = await this.prisma.category.findFirst({
        where: {
          name: updateCategoryDto.name,
          deletedAt: null,
        },
      });

      if (nameConflict) {
        throw new ConflictException(`Category with name "${updateCategoryDto.name}" already exists`);
      }
    }

    const category = await this.prisma.category.update({
      where: { id },
      data: {
        name: updateCategoryDto.name,
      },
    });

    return this.mapToResponseDto(category);
  }

  async remove(id: string): Promise<void> {
    const existingCategory = await this.prisma.category.findFirst({
      where: { id, deletedAt: null },
    });

    if (!existingCategory) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    // Soft delete the category
    await this.prisma.category.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  private mapToResponseDto(category: any): CategoryResponseDto {
    return {
      id: category.id,
      name: category.name,
      createdAt: category.createdAt,
      updatedAt: category.updatedAt,
    };
  }
}
