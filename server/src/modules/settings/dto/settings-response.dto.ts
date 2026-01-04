import { ApiProperty } from "@nestjs/swagger";

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

