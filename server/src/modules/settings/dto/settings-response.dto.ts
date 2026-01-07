import { ApiProperty } from "@nestjs/swagger";

class FooterLinkResponseDto {
  @ApiProperty({
    description: "Link label/text",
    example: "Discord",
  })
  label!: string;

  @ApiProperty({
    description: "Link URL",
    example: "https://discord.gg/example",
  })
  href!: string;
}

export class SettingsResponseDto {
  @ApiProperty({
    description: "Settings unique identifier",
    example: "clx1234567890abcdef",
  })
  id!: string;

  @ApiProperty({
    description: "How to buy video URL",
    example: "/videos/how-to-buy.mp4",
    required: false,
  })
  howToBuyVideoUrl?: string;

  @ApiProperty({
    description: "How to buy video thumbnail URL",
    example: "/images/how-to-buy-thumbnail.jpg",
    required: false,
  })
  howToBuyVideoThumbnail?: string;

  @ApiProperty({
    description: "Game circular icons URLs",
    example: ["/images/game1-circular.png", "/images/game2-circular.png"],
    type: [String],
    required: false,
  })
  gameIdsForIcons?: string[];

  @ApiProperty({
    description: "Game IDs for carousel",
    example: ["clx1234567890abcdef", "clx0987654321fedcba"],
    type: [String],
    required: false,
  })
  gameIdsForCarousel?: string[];

  @ApiProperty({
    description: "Footer links array",
    type: [FooterLinkResponseDto],
    example: [
      { label: "Discord", href: "https://discord.gg/example" },
      { label: "Telegram", href: "https://t.me/example" }
    ],
    required: false,
  })
  footerLinks?: FooterLinkResponseDto[];

  @ApiProperty({
    description: "Support link URL",
    example: "https://discord.gg/support",
    required: false,
  })
  supportLink?: string;

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

