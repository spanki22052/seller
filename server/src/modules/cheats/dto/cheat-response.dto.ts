import { ApiProperty } from "@nestjs/swagger";
import { CheatPriceDto } from "./cheat-price.dto";
import { BreadcrumbItemDto } from "./breadcrumb-item.dto";
import { FunctionCategoryDto } from "./function-category.dto";
import { PricingPlanDto } from "./pricing-plan.dto";
import { ReviewDigitalSellerDto } from "./review-digital-seller.dto";
import { CheatStatus } from "./create-cheat.dto";

export class CheatResponseDto {
  @ApiProperty({
    description: "Cheat unique identifier",
    example: "clx1234567890abcdef",
  })
  id!: string;

  @ApiProperty({
    description: "Game ID this cheat belongs to",
    example: "clx1234567890abcdef",
  })
  gameId!: string;

  @ApiProperty({
    description: "Game name this cheat belongs to",
    example: "BATTLEFIELD 2042",
  })
  gameName!: string;

  @ApiProperty({
    description: "Cheat name",
    example: "BTG",
  })
  name!: string;

  @ApiProperty({
    description: "Cheat brand name",
    example: "CROOKED",
  })
  brandName!: string;

  @ApiProperty({
    description: "Digital Seller review information",
    type: [ReviewDigitalSellerDto],
    example: [{ sellerId: "123456", productId: "789012" }],
    required: false,
  })
  reviewDigitalSeller?: ReviewDigitalSellerDto[];

  @ApiProperty({
    description: "Cheat description",
    example: "Ознакомьтесь подробней и приступайте к оплате",
    required: false,
  })
  description?: string;

  @ApiProperty({
    description: "Cheat description in Markdown format",
    example: "# Описание\n\nЭто **важный** текст с форматированием",
    required: false,
  })
  descriptionMarkdown?: string;

  @ApiProperty({
    description: "SEO keywords text for search engines",
    example: "aimbot, wallhack, esp, battlefield 2042 cheat",
    required: false,
  })
  seoText?: string;

  @ApiProperty({
    description: "Circular text for hero section",
    example: "ПРИВАТНЫЕ ЧИТЫ НА САЙТЕ CHITARENA.COM",
    required: false,
  })
  circularText?: string;

  @ApiProperty({
    description: "Cheat image URL (jpg, jpeg, png)",
    example: "/images/cheats/btg.png",
    required: false,
  })
  image?: string;

  @ApiProperty({
    description: "Cheat circular image URL (jpg, jpeg, png) - cropped to circle",
    example: "/images/cheats/btg-circular.png",
    required: false,
  })
  circularImage?: string;

  @ApiProperty({
    description: "Cheat background image URL (jpg, jpeg, png)",
    example: "/images/cheats/btg-background.jpg",
    required: false,
  })
  backgroundImage?: string;

  @ApiProperty({
    description: "Cheat price information",
    type: CheatPriceDto,
  })
  price!: CheatPriceDto;

  @ApiProperty({
    description: "Product name",
    example: "CFFHOOK",
  })
  productName!: string;

  @ApiProperty({
    description: "Supported Windows version",
    example: "Windows 10-11 [1909-23H2]",
  })
  windowsVersion!: string;

  @ApiProperty({
    description: "Supported game version",
    example: "Steam",
  })
  gameVersion!: string;

  @ApiProperty({
    description: "Game mode",
    example: "Оконный",
  })
  gameMode!: string;

  @ApiProperty({
    description: "Supported processors",
    example: "Intel и AMD",
    required: false,
  })
  processors?: string;

  @ApiProperty({
    description: "Supported operating systems",
    example: ["Windows 10", "Windows 11"],
    type: [String],
    required: false,
  })
  supportedSystems?: string[];

  @ApiProperty({
    description: "Button text",
    example: "ОТЗЫВЫ",
    required: false,
  })
  buttonText?: string;

  @ApiProperty({
    description: "Breadcrumb items",
    type: [BreadcrumbItemDto],
  })
  breadcrumbs!: BreadcrumbItemDto[];

  @ApiProperty({
    description: "Video URL (mp4)",
    example: "https://example.com/video.mp4",
    required: false,
  })
  videoUrl?: string;

  @ApiProperty({
    description: "Video thumbnail URL",
    example: "/images/video-thumbnail.jpg",
    required: false,
  })
  videoThumbnail?: string;

  @ApiProperty({
    description: "Screenshot URLs (jpg, jpeg, png)",
    example: ["/images/screenshots/1.jpg", "/images/screenshots/2.jpg"],
    type: [String],
    required: false,
  })
  screenshots?: string[];

  @ApiProperty({
    description: "Function categories",
    type: [FunctionCategoryDto],
    required: false,
  })
  functions?: FunctionCategoryDto[];

  @ApiProperty({
    description: "Pricing plans",
    type: [PricingPlanDto],
    required: false,
  })
  pricingPlans?: PricingPlanDto[];

  @ApiProperty({
    description: "Whether this cheat is new",
    example: false,
    required: false,
  })
  isNew?: boolean;

  @ApiProperty({
    description: "Whether this cheat is coming soon",
    example: false,
    required: false,
  })
  isComingSoon?: boolean;

  @ApiProperty({
    description: "Cheat status",
    enum: CheatStatus,
    example: CheatStatus.AVAILABLE,
  })
  status!: CheatStatus;

  @ApiProperty({
    description: "Creation timestamp",
    example: "2024-01-01T00:00:00.000Z",
  })
  createdAt!: Date;

  @ApiProperty({
    description: "Last update timestamp",
    example: "2024-01-01T00:00:00.000Z",
  })
  updatedAt!: Date;
}
