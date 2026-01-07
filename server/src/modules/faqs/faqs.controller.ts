import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
  UseGuards,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { FaqsService } from "./faqs.service";
import { CreateFaqDto } from "./dto/create-faq.dto";
import { UpdateFaqDto } from "./dto/update-faq.dto";
import { FaqResponseDto } from "./dto/faq-response.dto";

@ApiTags("faqs")
@Controller("faqs")
export class FaqsController {
  constructor(private readonly faqsService: FaqsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: "Create a new FAQ" })
  @ApiResponse({
    status: 201,
    description: "FAQ created successfully",
    type: FaqResponseDto,
  })
  async create(@Body() createFaqDto: CreateFaqDto): Promise<FaqResponseDto> {
    return this.faqsService.create(createFaqDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all FAQs (admin)" })
  @ApiResponse({
    status: 200,
    description: "List of all FAQs",
    type: [FaqResponseDto],
  })
  async findAll(): Promise<FaqResponseDto[]> {
    return this.faqsService.findAll();
  }

  @Get("active")
  @ApiOperation({ summary: "Get active FAQs (public)" })
  @ApiResponse({
    status: 200,
    description: "List of active FAQs",
    type: [FaqResponseDto],
  })
  async findActive(): Promise<FaqResponseDto[]> {
    return this.faqsService.findActive();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a FAQ by ID" })
  @ApiParam({ name: "id", description: "FAQ ID" })
  @ApiResponse({
    status: 200,
    description: "FAQ found",
    type: FaqResponseDto,
  })
  @ApiResponse({ status: 404, description: "FAQ not found" })
  async findOne(@Param("id") id: string): Promise<FaqResponseDto> {
    return this.faqsService.findOne(id);
  }

  @Put(":id")
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Update a FAQ" })
  @ApiParam({ name: "id", description: "FAQ ID" })
  @ApiResponse({
    status: 200,
    description: "FAQ updated successfully",
    type: FaqResponseDto,
  })
  @ApiResponse({ status: 404, description: "FAQ not found" })
  async update(
    @Param("id") id: string,
    @Body() updateFaqDto: UpdateFaqDto,
  ): Promise<FaqResponseDto> {
    return this.faqsService.update(id, updateFaqDto);
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: "Delete a FAQ" })
  @ApiParam({ name: "id", description: "FAQ ID" })
  @ApiResponse({ status: 204, description: "FAQ deleted successfully" })
  @ApiResponse({ status: 404, description: "FAQ not found" })
  async remove(@Param("id") id: string): Promise<void> {
    return this.faqsService.remove(id);
  }
}
