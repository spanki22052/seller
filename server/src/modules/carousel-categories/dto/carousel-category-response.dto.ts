import { ApiProperty } from "@nestjs/swagger";

export class CarouselCategoryResponseDto {
  @ApiProperty({
    description: "Carousel category ID",
    example: "cm0q8x8x8x8x8x8x8x8x8",
  })
  id!: string;

  @ApiProperty({
    description: "Carousel category name",
    example: "Featured Games",
  })
  name!: string;

  @ApiProperty({
    description: "Carousel category creation date",
    example: "2023-12-01T10:00:00.000Z",
  })
  createdAt!: Date;

  @ApiProperty({
    description: "Carousel category last update date",
    example: "2023-12-01T10:00:00.000Z",
  })
  updatedAt!: Date;
}
