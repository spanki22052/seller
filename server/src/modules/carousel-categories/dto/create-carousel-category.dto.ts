import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty } from "class-validator";

export class CreateCarouselCategoryDto {
  @ApiProperty({
    description: "Carousel category name",
    example: "Featured Games",
  })
  @IsString()
  @IsNotEmpty()
  name!: string;
}
