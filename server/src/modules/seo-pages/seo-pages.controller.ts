import {
  Controller,
  Get,
  Put,
  Param,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { SeoPagesService } from "./seo-pages.service";
import { UpdateSeoPageDto } from "./dto/update-seo-page.dto";
import { SeoPageResponseDto } from "./dto/seo-page-response.dto";

@ApiTags("seo-pages")
@Controller("seo-pages")
export class SeoPagesController {
  constructor(private readonly seoPagesService: SeoPagesService) {}

  @Get(":pageType")
  @ApiOperation({ summary: "Get SEO keywords for a specific page type" })
  @ApiParam({
    name: "pageType",
    description: "Page type (home, games, faq)",
    enum: ["home", "games", "faq"],
  })
  @ApiResponse({
    status: 200,
    description: "SEO page found",
    type: SeoPageResponseDto,
  })
  @ApiResponse({ status: 404, description: "SEO page not found" })
  async findByPageType(@Param("pageType") pageType: string): Promise<SeoPageResponseDto | null> {
    return this.seoPagesService.findByPageType(pageType);
  }

  @Put(":pageType")
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Update SEO keywords for a specific page type" })
  @ApiParam({
    name: "pageType",
    description: "Page type (home, games, faq)",
    enum: ["home", "games", "faq"],
  })
  @ApiResponse({
    status: 200,
    description: "SEO page updated successfully",
    type: SeoPageResponseDto,
  })
  async updateByPageType(
    @Param("pageType") pageType: string,
    @Body() updateSeoPageDto: UpdateSeoPageDto,
  ): Promise<SeoPageResponseDto> {
    return this.seoPagesService.upsertByPageType(pageType, updateSeoPageDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all SEO pages" })
  @ApiResponse({
    status: 200,
    description: "List of all SEO pages",
    type: [SeoPageResponseDto],
  })
  async findAll(): Promise<SeoPageResponseDto[]> {
    return this.seoPagesService.findAll();
  }
}
