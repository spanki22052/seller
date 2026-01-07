import { ApiProperty } from "@nestjs/swagger";

export class BrandResponseDto {
  @ApiProperty({
    description: "Brand unique identifier",
    example: "clx1234567890abcdef",
  })
  id!: string;

  @ApiProperty({
    description: "Brand name",
    example: "CROOKED",
  })
  name!: string;

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
