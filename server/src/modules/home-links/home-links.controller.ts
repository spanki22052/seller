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
import { HomeLinksService } from "./home-links.service";
import { CreateHomeLinkDto } from "./dto/create-home-link.dto";
import { UpdateHomeLinkDto } from "./dto/update-home-link.dto";
import { HomeLinkResponseDto } from "./dto/home-link-response.dto";

@ApiTags("home-links")
@Controller("home-links")
export class HomeLinksController {
  constructor(private readonly homeLinksService: HomeLinksService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: "Create a new home link" })
  @ApiResponse({
    status: 201,
    description: "Home link created successfully",
    type: HomeLinkResponseDto,
  })
  async create(@Body() createHomeLinkDto: CreateHomeLinkDto): Promise<HomeLinkResponseDto> {
    return this.homeLinksService.create(createHomeLinkDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all home links (admin)" })
  @ApiResponse({
    status: 200,
    description: "List of all home links",
    type: [HomeLinkResponseDto],
  })
  async findAll(): Promise<HomeLinkResponseDto[]> {
    return this.homeLinksService.findAll();
  }

  @Get("active")
  @ApiOperation({ summary: "Get active home links (public)" })
  @ApiResponse({
    status: 200,
    description: "List of active home links",
    type: [HomeLinkResponseDto],
  })
  async findActive(): Promise<HomeLinkResponseDto[]> {
    return this.homeLinksService.findActive();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a home link by ID" })
  @ApiParam({ name: "id", description: "Home link ID" })
  @ApiResponse({
    status: 200,
    description: "Home link found",
    type: HomeLinkResponseDto,
  })
  @ApiResponse({ status: 404, description: "Home link not found" })
  async findOne(@Param("id") id: string): Promise<HomeLinkResponseDto> {
    return this.homeLinksService.findOne(id);
  }

  @Put(":id")
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Update a home link" })
  @ApiParam({ name: "id", description: "Home link ID" })
  @ApiResponse({
    status: 200,
    description: "Home link updated successfully",
    type: HomeLinkResponseDto,
  })
  @ApiResponse({ status: 404, description: "Home link not found" })
  async update(
    @Param("id") id: string,
    @Body() updateHomeLinkDto: UpdateHomeLinkDto,
  ): Promise<HomeLinkResponseDto> {
    return this.homeLinksService.update(id, updateHomeLinkDto);
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: "Delete a home link" })
  @ApiParam({ name: "id", description: "Home link ID" })
  @ApiResponse({ status: 204, description: "Home link deleted successfully" })
  @ApiResponse({ status: 404, description: "Home link not found" })
  async remove(@Param("id") id: string): Promise<void> {
    return this.homeLinksService.remove(id);
  }
}
