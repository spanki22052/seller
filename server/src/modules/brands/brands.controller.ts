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
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from "@nestjs/swagger";
import { BrandsService } from "./brands.service";
import { CreateBrandDto } from "./dto/create-brand.dto";
import { UpdateBrandDto } from "./dto/update-brand.dto";
import { BrandResponseDto } from "./dto/brand-response.dto";

@ApiTags("brands")
@Controller("brands")
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: "Create a new brand" })
  @ApiResponse({
    status: 201,
    description: "Brand created successfully",
    type: BrandResponseDto,
  })
  @ApiResponse({ status: 409, description: "Brand with this name already exists" })
  async create(@Body() createBrandDto: CreateBrandDto): Promise<BrandResponseDto> {
    return this.brandsService.create(createBrandDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all brands" })
  @ApiResponse({
    status: 200,
    description: "List of all brands",
    type: [BrandResponseDto],
  })
  async findAll(): Promise<BrandResponseDto[]> {
    return this.brandsService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a brand by ID" })
  @ApiParam({ name: "id", description: "Brand ID" })
  @ApiResponse({
    status: 200,
    description: "Brand found",
    type: BrandResponseDto,
  })
  @ApiResponse({ status: 404, description: "Brand not found" })
  async findOne(@Param("id") id: string): Promise<BrandResponseDto> {
    return this.brandsService.findOne(id);
  }

  @Put(":id")
  @ApiOperation({ summary: "Update a brand" })
  @ApiParam({ name: "id", description: "Brand ID" })
  @ApiResponse({
    status: 200,
    description: "Brand updated successfully",
    type: BrandResponseDto,
  })
  @ApiResponse({ status: 404, description: "Brand not found" })
  @ApiResponse({ status: 409, description: "Brand with this name already exists" })
  async update(
    @Param("id") id: string,
    @Body() updateBrandDto: UpdateBrandDto,
  ): Promise<BrandResponseDto> {
    return this.brandsService.update(id, updateBrandDto);
  }

  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: "Delete a brand" })
  @ApiParam({ name: "id", description: "Brand ID" })
  @ApiResponse({ status: 204, description: "Brand deleted successfully" })
  @ApiResponse({ status: 404, description: "Brand not found" })
  async remove(@Param("id") id: string): Promise<void> {
    return this.brandsService.remove(id);
  }
}
