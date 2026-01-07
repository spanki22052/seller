import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsOptional } from "class-validator";

export class UpdateCategoryDto {
  @ApiProperty({
    description: "Category name",
    example: "First Person Shooter",
    required: false,
  })
  @IsString()
  @IsOptional()
  name?: string;
}
