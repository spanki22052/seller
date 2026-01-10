import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsArray, IsNotEmpty } from "class-validator";

export class FunctionCategoryDto {
  @ApiProperty({
    description: "Function category ID",
    example: "aim",
  })
  @IsString()
  @IsNotEmpty()
  id!: string;

  @ApiProperty({
    description: "Function category name",
    example: "AIM",
  })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({
    description: "List of features in this category",
    example: ["Aim on vehicles", "Visibility check", "Control radius"],
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  features!: string[];
}
