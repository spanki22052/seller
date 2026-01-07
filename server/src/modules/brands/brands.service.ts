import { Injectable, NotFoundException, ConflictException } from "@nestjs/common";
import { PrismaService } from "../../shared/prisma/prisma.service";
import { CreateBrandDto } from "./dto/create-brand.dto";
import { UpdateBrandDto } from "./dto/update-brand.dto";
import { BrandResponseDto } from "./dto/brand-response.dto";

@Injectable()
export class BrandsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createBrandDto: CreateBrandDto): Promise<BrandResponseDto> {
    // Check if brand with this name already exists
    const existingBrand = await this.prisma.brand.findFirst({
      where: {
        name: createBrandDto.name,
        deletedAt: null,
      },
    });

    if (existingBrand) {
      throw new ConflictException(`Brand with name "${createBrandDto.name}" already exists`);
    }

    const brand = await this.prisma.brand.create({
      data: {
        name: createBrandDto.name,
      },
    });

    return this.mapToResponseDto(brand);
  }

  async findAll(): Promise<BrandResponseDto[]> {
    const brands = await this.prisma.brand.findMany({
      where: { deletedAt: null },
      orderBy: { name: "asc" },
    });

    return brands.map((brand) => this.mapToResponseDto(brand));
  }

  async findOne(id: string): Promise<BrandResponseDto> {
    const brand = await this.prisma.brand.findFirst({
      where: { id, deletedAt: null },
    });

    if (!brand) {
      throw new NotFoundException(`Brand with ID ${id} not found`);
    }

    return this.mapToResponseDto(brand);
  }

  async update(id: string, updateBrandDto: UpdateBrandDto): Promise<BrandResponseDto> {
    const existingBrand = await this.prisma.brand.findFirst({
      where: { id, deletedAt: null },
    });

    if (!existingBrand) {
      throw new NotFoundException(`Brand with ID ${id} not found`);
    }

    // Check if new name conflicts with existing brand
    if (updateBrandDto.name && updateBrandDto.name !== existingBrand.name) {
      const nameConflict = await this.prisma.brand.findFirst({
        where: {
          name: updateBrandDto.name,
          deletedAt: null,
        },
      });

      if (nameConflict) {
        throw new ConflictException(`Brand with name "${updateBrandDto.name}" already exists`);
      }
    }

    const brand = await this.prisma.brand.update({
      where: { id },
      data: {
        name: updateBrandDto.name,
      },
    });

    return this.mapToResponseDto(brand);
  }

  async remove(id: string): Promise<void> {
    const existingBrand = await this.prisma.brand.findFirst({
      where: { id, deletedAt: null },
    });

    if (!existingBrand) {
      throw new NotFoundException(`Brand with ID ${id} not found`);
    }

    // Soft delete the brand
    await this.prisma.brand.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  private mapToResponseDto(brand: any): BrandResponseDto {
    return {
      id: brand.id,
      name: brand.name,
      createdAt: brand.createdAt,
      updatedAt: brand.updatedAt,
    };
  }
}
