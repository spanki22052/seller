import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsOptional } from "class-validator";

export class BreadcrumbItemDto {
  @ApiProperty({
    description: "Breadcrumb label",
    example: "Скриншоты",
  })
  @IsString()
  label!: string;

  @ApiProperty({
    description: "Breadcrumb href (optional)",
    example: "/game/battlefield-2042",
    required: false,
  })
  @IsString()
  @IsOptional()
  href?: string;

  @ApiProperty({
    description: "Section ID for scroll navigation",
    example: "screenshots",
    required: false,
  })
  @IsString()
  @IsOptional()
  sectionId?: string;
}

