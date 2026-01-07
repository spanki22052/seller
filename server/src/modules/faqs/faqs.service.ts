import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../shared/prisma/prisma.service";
import { CreateFaqDto } from "./dto/create-faq.dto";
import { UpdateFaqDto } from "./dto/update-faq.dto";
import { FaqResponseDto } from "./dto/faq-response.dto";

@Injectable()
export class FaqsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createFaqDto: CreateFaqDto): Promise<FaqResponseDto> {
    const faq = await this.prisma.faq.create({
      data: {
        question: createFaqDto.question,
        answer: createFaqDto.answer,
        isActive: createFaqDto.isActive ?? true,
        sortOrder: createFaqDto.sortOrder ?? 0,
      },
    });

    return this.mapToResponseDto(faq);
  }

  async findAll(): Promise<FaqResponseDto[]> {
    const faqs = await this.prisma.faq.findMany({
      where: { deletedAt: null },
      orderBy: [
        { sortOrder: "asc" },
        { createdAt: "asc" }
      ],
    });

    return faqs.map((faq) => this.mapToResponseDto(faq));
  }

  async findActive(): Promise<FaqResponseDto[]> {
    const faqs = await this.prisma.faq.findMany({
      where: {
        deletedAt: null,
        isActive: true,
      },
      orderBy: [
        { sortOrder: "asc" },
        { createdAt: "asc" }
      ],
    });

    return faqs.map((faq) => this.mapToResponseDto(faq));
  }

  async findOne(id: string): Promise<FaqResponseDto> {
    const faq = await this.prisma.faq.findFirst({
      where: { id, deletedAt: null },
    });

    if (!faq) {
      throw new NotFoundException(`FAQ with ID ${id} not found`);
    }

    return this.mapToResponseDto(faq);
  }

  async update(id: string, updateFaqDto: UpdateFaqDto): Promise<FaqResponseDto> {
    const existingFaq = await this.prisma.faq.findFirst({
      where: { id, deletedAt: null },
    });

    if (!existingFaq) {
      throw new NotFoundException(`FAQ with ID ${id} not found`);
    }

    const faq = await this.prisma.faq.update({
      where: { id },
      data: {
        question: updateFaqDto.question,
        answer: updateFaqDto.answer,
        isActive: updateFaqDto.isActive,
        sortOrder: updateFaqDto.sortOrder,
      },
    });

    return this.mapToResponseDto(faq);
  }

  async remove(id: string): Promise<void> {
    const existingFaq = await this.prisma.faq.findFirst({
      where: { id, deletedAt: null },
    });

    if (!existingFaq) {
      throw new NotFoundException(`FAQ with ID ${id} not found`);
    }

    // Soft delete the faq
    await this.prisma.faq.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  private mapToResponseDto(faq: any): FaqResponseDto {
    return {
      id: faq.id,
      question: faq.question,
      answer: faq.answer,
      isActive: faq.isActive,
      sortOrder: faq.sortOrder,
      createdAt: faq.createdAt,
      updatedAt: faq.updatedAt,
    };
  }
}
