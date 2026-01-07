import { ApiProperty } from "@nestjs/swagger";

export class CategoryResponseDto {
  @ApiProperty({
    description: "Category ID",
    example: "cm0q8x8x8x8x8x8x8x8x8",
  })
  id!: string;

  @ApiProperty({
    description: "Category name",
    example: "Shooter",
  })
  name!: string;

  @ApiProperty({
    description: "Category creation date",
    example: "2023-12-01T10:00:00.000Z",
  })
  createdAt!: Date;

  @ApiProperty({
    description: "Category last update date",
    example: "2023-12-01T10:00:00.000Z",
  })
  updatedAt!: Date;
}
