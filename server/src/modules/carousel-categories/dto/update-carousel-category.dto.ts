import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsOptional } from "class-validator";

export class UpdateCarouselCategoryDto {
  @ApiProperty({
    description: "Carousel category name",
    example: "Top Rated Games",
    required: false,
  })
  @IsString()
  @IsOptional()
  name?: string;
}
