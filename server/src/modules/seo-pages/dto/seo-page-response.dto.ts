import { ApiProperty } from "@nestjs/swagger";

export class SeoPageResponseDto {
  @ApiProperty({
    description: "SEO page ID",
    example: "ckp1f8qkz0000abcdefgh",
  })
  id!: string;

  @ApiProperty({
    description: "Page type",
    example: "home",
    enum: ["home", "games", "faq"],
  })
  pageType!: string;

  @ApiProperty({
    description: "Array of SEO keywords",
    example: ["купить читы", "лучшие читы для игр", "анти-чит система"],
    type: [String],
  })
  keywords!: string[];

  @ApiProperty({
    description: "Creation date",
    example: "2023-01-01T00:00:00.000Z",
  })
  createdAt!: Date;

  @ApiProperty({
    description: "Last update date",
    example: "2023-01-01T00:00:00.000Z",
  })
  updatedAt!: Date;
}
