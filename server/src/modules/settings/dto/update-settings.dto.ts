import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

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
}

