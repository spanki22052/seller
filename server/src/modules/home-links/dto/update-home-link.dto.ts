import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsOptional, IsBoolean, IsNumber, Min } from "class-validator";

export class UpdateHomeLinkDto {
  @ApiProperty({
    description: "Link title",
    example: "Новые релизы 2025",
    required: false,
  })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({
    description: "Link URL",
    example: "/new-releases-2025",
    required: false,
  })
  @IsString()
  @IsOptional()
  url?: string;

  @ApiProperty({
    description: "Link description",
    example: "Новые релизы 2025 года",
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: "Is link active",
    example: false,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @ApiProperty({
    description: "Sort order",
    example: 1,
    required: false,
  })
  @IsNumber()
  @Min(0)
  @IsOptional()
  sortOrder?: number;
}
