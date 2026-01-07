import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, IsArray, IsObject, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

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

export class UpdateSettingsDto {
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
    description: "Game IDs for carousel",
    example: ["clx1234567890abcdef", "clx0987654321fedcba"],
    type: [String],
    required: false,
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  gameIdsForCarousel?: string[];

  @ApiProperty({
    description: "Footer links array",
    type: [FooterLinkDto],
    example: [
      { label: "Discord", href: "https://discord.gg/example" },
      { label: "Telegram", href: "https://t.me/example" }
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
}

