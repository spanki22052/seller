import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, IsArray, IsObject, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

class CarouselCategoryGamesDto {
  @ApiProperty({
    description: "Carousel category ID",
    example: "clx1234567890abcdef",
  })
  @IsString()
  id!: string;

  @ApiProperty({
    description: "Game IDs for this carousel category",
    example: ["clx1234567890abcdef", "clx0987654321fedcba"],
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  games!: string[];
}

class FooterLinkDto {
  @ApiProperty({
    description: "Link label/text",
    example: "Discord",
  })
  @IsString()
  label!: string;

  @ApiProperty({
    description: "Link URL",
    example: "https://discord.gg/example",
  })
  @IsString()
  href!: string;
}

class SupportLinkDto {
  @ApiProperty({
    description: "Link label/text",
    example: "Техническая поддержка",
  })
  @IsString()
  label!: string;

  @ApiProperty({
    description: "Link URL",
    example: "https://discord.gg/support",
  })
  @IsString()
  href!: string;
}

export class UpdateSettingsDto {
  @ApiProperty({
    description: "Seller ID",
    example: "3331046",
    required: false,
  })
  @IsOptional()
  @IsString()
  sellerId?: string;

  @ApiProperty({
    description: "How to buy video URL",
    example: "/videos/how-to-buy.mp4",
    required: false,
  })
  @IsOptional()
  @IsString()
  howToBuyVideoUrl?: string;

  @ApiProperty({
    description: "How to buy video thumbnail URL",
    example: "/images/how-to-buy-thumbnail.jpg",
    required: false,
  })
  @IsOptional()
  @IsString()
  howToBuyVideoThumbnail?: string;

  @ApiProperty({
    description: "Game circular icons URLs",
    example: ["/images/game1-circular.png", "/images/game2-circular.png"],
    type: [String],
    required: false,
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  gameIdsForIcons?: string[];

  @ApiProperty({
    description: "Carousel categories with their games",
    example: [
      {
        id: "clx1234567890abcdef",
        games: ["clx1234567890abcdef", "clx0987654321fedcba"],
      },
    ],
    type: [CarouselCategoryGamesDto],
    required: false,
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CarouselCategoryGamesDto)
  gameIdsForCarousel?: CarouselCategoryGamesDto[];

  @ApiProperty({
    description: "Footer links array",
    type: [FooterLinkDto],
    example: [
      { label: "Discord", href: "https://discord.gg/example" },
      { label: "Telegram", href: "https://t.me/example" },
    ],
    required: false,
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FooterLinkDto)
  footerLinks?: FooterLinkDto[] | null;

  @ApiProperty({
    description: "Support link URL",
    example: "https://discord.gg/support",
    required: false,
  })
  @IsOptional()
  @IsString()
  supportLink?: string;

  @ApiProperty({
    description: "Support links array",
    type: [SupportLinkDto],
    example: [
      { label: "Техническая поддержка", href: "https://discord.gg/support" },
      { label: "Связь с администратором", href: "https://t.me/admin" },
    ],
    required: false,
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SupportLinkDto)
  supportLinks?: SupportLinkDto[] | null;
}
