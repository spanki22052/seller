import { ApiProperty } from "@nestjs/swagger";

class CarouselCategoryGamesResponseDto {
  @ApiProperty({
    description: "Carousel category ID",
    example: "clx1234567890abcdef",
  })
  id!: string;

  @ApiProperty({
    description: "Game IDs for this carousel category",
    example: ["clx1234567890abcdef", "clx0987654321fedcba"],
    type: [String],
  })
  games!: string[];
}

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

class SupportLinkResponseDto {
  @ApiProperty({
    description: "Link label/text",
    example: "Техническая поддержка",
  })
  label!: string;

  @ApiProperty({
    description: "Link URL",
    example: "https://discord.gg/support",
  })
  href!: string;
}

class FooterLabelResponseDto {
  @ApiProperty({
    description: "Label text",
    example: "© Official email address of our site",
  })
  label!: string;

  @ApiProperty({
    description: "Optional link URL",
    example: "mailto:example@email.com",
    required: false,
  })
  href?: string;
}

export class SettingsResponseDto {
  @ApiProperty({
    description: "Settings unique identifier",
    example: "clx1234567890abcdef",
  })
  id!: string;

  @ApiProperty({
    description: "Seller ID",
    example: "3331046",
    required: false,
  })
  sellerId?: string;

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
    description: "Carousel categories with their games",
    example: [
      {
        id: "clx1234567890abcdef",
        games: ["clx1234567890abcdef", "clx0987654321fedcba"],
      },
    ],
    type: [CarouselCategoryGamesResponseDto],
    required: false,
  })
  gameIdsForCarousel?: CarouselCategoryGamesResponseDto[];

  @ApiProperty({
    description: "Footer links array",
    type: [FooterLinkResponseDto],
    example: [
      { label: "Discord", href: "https://discord.gg/example" },
      { label: "Telegram", href: "https://t.me/example" },
    ],
    required: false,
  })
  footerLinks?: FooterLinkResponseDto[];

  @ApiProperty({
    description: "Footer labels array",
    type: [FooterLabelResponseDto],
    example: [
      { label: "© Official email address of our site" },
      { label: "Chitarena@yandex.ru", href: "mailto:Chitarena@yandex.ru" },
    ],
    required: false,
  })
  footerLabels?: FooterLabelResponseDto[];

  @ApiProperty({
    description: "Support link URL",
    example: "https://discord.gg/support",
    required: false,
  })
  supportLink?: string;

  @ApiProperty({
    description: "Support links array",
    type: [SupportLinkResponseDto],
    example: [
      { label: "Техническая поддержка", href: "https://discord.gg/support" },
      { label: "Связь с администратором", href: "https://t.me/admin" },
    ],
    required: false,
  })
  supportLinks?: SupportLinkResponseDto[];

  @ApiProperty({
    description: "Icon URL",
    example: "/images/icon.png",
    required: false,
  })
  iconUrl?: string;

  @ApiProperty({
    description: "Main page title text",
    example: "Приватные DLC",
    required: false,
  })
  mainPageTitle?: string;

  @ApiProperty({
    description: "Main page description text",
    example: "Сейчас на сайте нет контента который вы ищите. Мы работаем на решением проблем.",
    required: false,
  })
  mainPageDescription?: string;

  @ApiProperty({
    description: "Site name",
    example: "CheatArena",
    required: false,
  })
  siteName?: string;

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
