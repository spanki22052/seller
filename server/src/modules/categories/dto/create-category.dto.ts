import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty } from "class-validator";

export class CreateCategoryDto {
  @ApiProperty({
    description: "Category name",
    example: "Shooter",
  })
  @IsString()
  @IsNotEmpty()
  name!: string;
}
