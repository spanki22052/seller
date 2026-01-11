import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsString, IsOptional } from "class-validator";

export class UpdateSeoPageDto {
  @ApiProperty({
    description: "Array of SEO keywords for the page",
    example: ["купить читы", "лучшие читы для игр", "анти-чит система"],
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  keywords?: string[];
}
