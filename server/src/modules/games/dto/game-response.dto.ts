import { ApiProperty } from "@nestjs/swagger";

export class GameResponseDto {
  @ApiProperty({
    description: "Game unique identifier",
    example: "clx1234567890abcdef",
  })
  id!: string;

  @ApiProperty({
    description: "Game name",
    example: "Battlefield 2042",
  })
  name!: string;

  @ApiProperty({
    description: "Game color theme (hex code)",
    example: "#FF5733",
  })
  color!: string;

  @ApiProperty({
    description: "Game category ID",
    example: "cm0q8x8x8x8x8x8x8x8x8",
    required: false,
  })
  categoryId?: string;

  @ApiProperty({
    description: "Game category name",
    example: "Shooter",
    required: false,
  })
  categoryName?: string;

  @ApiProperty({
    description: "Game image URL",
    example: "/images/games/battlefield-2042.png",
    required: false,
  })
  image?: string;

  @ApiProperty({
    description: "Game background image URL (jpg, jpeg, png)",
    example: "/images/games/battlefield-2042-background.jpg",
    required: false,
  })
  backgroundImage?: string;

  @ApiProperty({
    description: "Game icon image URL",
    example: "/images/games/battlefield-2042-icon.png",
    required: false,
  })
  icon?: string;

  @ApiProperty({
    description: "SEO keywords text for search engines",
    example: "battlefield 2042 cheats, battlefield 2042 hacks, battlefield 2042 aimbot",
    required: false,
  })
  seoText?: string;

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
