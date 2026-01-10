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
import { CarouselCategoriesService } from "./carousel-categories.service";
import { CreateCarouselCategoryDto } from "./dto/create-carousel-category.dto";
import { UpdateCarouselCategoryDto } from "./dto/update-carousel-category.dto";
import { CarouselCategoryResponseDto } from "./dto/carousel-category-response.dto";

@ApiTags("carousel-categories")
@Controller("carousel-categories")
export class CarouselCategoriesController {
  constructor(private readonly carouselCategoriesService: CarouselCategoriesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: "Create a new carousel category" })
  @ApiResponse({
    status: 201,
    description: "Carousel category created successfully",
    type: CarouselCategoryResponseDto,
  })
  @ApiResponse({ status: 409, description: "Carousel category with this name already exists" })
  async create(
    @Body() createCarouselCategoryDto: CreateCarouselCategoryDto,
  ): Promise<CarouselCategoryResponseDto> {
    return this.carouselCategoriesService.create(createCarouselCategoryDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all carousel categories" })
  @ApiResponse({
    status: 200,
    description: "List of all carousel categories",
    type: [CarouselCategoryResponseDto],
  })
  async findAll(): Promise<CarouselCategoryResponseDto[]> {
    return this.carouselCategoriesService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a carousel category by ID" })
  @ApiParam({ name: "id", description: "Carousel category ID" })
  @ApiResponse({
    status: 200,
    description: "Carousel category found",
    type: CarouselCategoryResponseDto,
  })
  @ApiResponse({ status: 404, description: "Carousel category not found" })
  async findOne(@Param("id") id: string): Promise<CarouselCategoryResponseDto> {
    return this.carouselCategoriesService.findOne(id);
  }

  @Put(":id")
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Update a carousel category" })
  @ApiParam({ name: "id", description: "Carousel category ID" })
  @ApiResponse({
    status: 200,
    description: "Carousel category updated successfully",
    type: CarouselCategoryResponseDto,
  })
  @ApiResponse({ status: 404, description: "Carousel category not found" })
  @ApiResponse({ status: 409, description: "Carousel category with this name already exists" })
  async update(
    @Param("id") id: string,
    @Body() updateCarouselCategoryDto: UpdateCarouselCategoryDto,
  ): Promise<CarouselCategoryResponseDto> {
    return this.carouselCategoriesService.update(id, updateCarouselCategoryDto);
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: "Delete a carousel category" })
  @ApiParam({ name: "id", description: "Carousel category ID" })
  @ApiResponse({ status: 204, description: "Carousel category deleted successfully" })
  @ApiResponse({ status: 404, description: "Carousel category not found" })
  async remove(@Param("id") id: string): Promise<void> {
    return this.carouselCategoriesService.remove(id);
  }
}
