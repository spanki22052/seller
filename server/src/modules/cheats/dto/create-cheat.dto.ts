import { ApiProperty } from "@nestjs/swagger";
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  IsArray,
  ValidateNested,
  IsEnum,
} from "class-validator";
import { Type } from "class-transformer";
import { CheatPriceDto } from "./cheat-price.dto";
import { BreadcrumbItemDto } from "./breadcrumb-item.dto";
import { FunctionCategoryDto } from "./function-category.dto";
import { PricingPlanDto } from "./pricing-plan.dto";

export enum CheatStatus {
  AVAILABLE = "AVAILABLE",
  UPDATING = "UPDATING",
  FROZEN = "FROZEN",
  DRAFT = "DRAFT",
}

export class CreateCheatDto {
  @ApiProperty({
    description: "Game ID this cheat belongs to",
    example: "clx1234567890abcdef",
  })
  @IsString()
  @IsNotEmpty()
  gameId!: string;

  @ApiProperty({
    description: "Cheat name",
    example: "BTG",
    required: false,
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    description: "Brand ID",
    example: "clx1234567890abcdef",
  })
  @IsString()
  @IsNotEmpty()
  brandId!: string;

  @ApiProperty({
    description: "Cheat ID in Digitseller",
    example: "123456",
    required: false,
  })
  @IsString()
  @IsOptional()
  cheatDigitId?: string;

  @ApiProperty({
    description: "Cheat description",
    example: "Ознакомьтесь подробней и приступайте к оплате",
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: "Cheat description in Markdown format",
    example: "# Описание\n\nЭто **важный** текст с форматированием",
    required: false,
  })
  @IsString()
  @IsOptional()
  descriptionMarkdown?: string;

  @ApiProperty({
    description: "Circular text for hero section",
    example: "ПРИВАТНЫЕ ЧИТЫ НА САЙТЕ CHITARENA.COM",
    required: false,
  })
  @IsString()
  @IsOptional()
  circularText?: string;

  @ApiProperty({
    description: "Cheat image URL (jpg, jpeg, png)",
    example: "/images/cheats/btg.png",
    required: false,
  })
  @IsString()
  @IsOptional()
  image?: string;

  @ApiProperty({
    description: "Cheat circular image URL (jpg, jpeg, png) - cropped to circle",
    example: "/images/cheats/btg-circular.png",
    required: false,
  })
  @IsString()
  @IsOptional()
  circularImage?: string;

  @ApiProperty({
    description: "Cheat background image URL (jpg, jpeg, png)",
    example: "/images/cheats/btg-background.jpg",
    required: false,
  })
  @IsString()
  @IsOptional()
  backgroundImage?: string;

  @ApiProperty({
    description: "Cheat price information",
    type: CheatPriceDto,
  })
  @ValidateNested()
  @Type(() => CheatPriceDto)
  price!: CheatPriceDto;

  @ApiProperty({
    description: "Product name",
    example: "CFFHOOK",
  })
  @IsString()
  @IsNotEmpty()
  productName!: string;

  @ApiProperty({
    description: "Supported Windows version",
    example: "Windows 10-11 [1909-23H2]",
    required: false,
  })
  @IsString()
  @IsOptional()
  windowsVersion?: string;

  @ApiProperty({
    description: "Supported game version",
    example: "Steam",
    required: false,
  })
  @IsString()
  @IsOptional()
  gameVersion?: string;

  @ApiProperty({
    description: "Game mode",
    example: "Оконный",
    required: false,
  })
  @IsString()
  @IsOptional()
  gameMode?: string;

  @ApiProperty({
    description: "Supported processors",
    example: "Intel и AMD",
    required: false,
  })
  @IsString()
  @IsOptional()
  processors?: string;

  @ApiProperty({
    description: "Supported operating systems",
    example: ["Windows 10", "Windows 11"],
    type: [String],
    required: false,
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  supportedSystems?: string[];

  @ApiProperty({
    description: "Button text",
    example: "ОТЗЫВЫ",
    required: false,
  })
  @IsString()
  @IsOptional()
  buttonText?: string;

  @ApiProperty({
    description: "Breadcrumb items",
    type: [BreadcrumbItemDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BreadcrumbItemDto)
  breadcrumbs!: BreadcrumbItemDto[];

  @ApiProperty({
    description: "Video URL (mp4)",
    example: "https://example.com/video.mp4",
    required: false,
  })
  @IsString()
  @IsOptional()
  videoUrl?: string;

  @ApiProperty({
    description: "Video thumbnail URL",
    example: "/images/video-thumbnail.jpg",
    required: false,
  })
  @IsString()
  @IsOptional()
  videoThumbnail?: string;

  @ApiProperty({
    description: "Screenshot URLs (jpg, jpeg, png)",
    example: ["/images/screenshots/1.jpg", "/images/screenshots/2.jpg"],
    type: [String],
    required: false,
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  screenshots?: string[];

  @ApiProperty({
    description: "Function categories",
    type: [FunctionCategoryDto],
    required: false,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FunctionCategoryDto)
  @IsOptional()
  functions?: FunctionCategoryDto[];

  @ApiProperty({
    description: "Pricing plans",
    type: [PricingPlanDto],
    required: false,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PricingPlanDto)
  @IsOptional()
  pricingPlans?: PricingPlanDto[];

  @ApiProperty({
    description: "Whether this cheat is new",
    example: false,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  isNew?: boolean;

  @ApiProperty({
    description: "Whether this cheat is coming soon",
    example: false,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  isComingSoon?: boolean;

  @ApiProperty({
    description: "Cheat status",
    enum: CheatStatus,
    example: CheatStatus.AVAILABLE,
    required: false,
  })
  @IsEnum(CheatStatus)
  @IsOptional()
  status?: CheatStatus;
}
