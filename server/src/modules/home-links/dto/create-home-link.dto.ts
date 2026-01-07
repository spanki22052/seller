import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsOptional, IsBoolean, IsNumber, Min } from "class-validator";

export class CreateHomeLinkDto {
  @ApiProperty({
    description: "Link title",
    example: "Новые релизы",
  })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiProperty({
    description: "Link URL",
    example: "/new-releases",
  })
  @IsString()
  @IsNotEmpty()
  url!: string;

  @ApiProperty({
    description: "Link description",
    example: "Посмотрите наши свежие обновления",
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: "Is link active",
    example: true,
    required: false,
    default: true,
  })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @ApiProperty({
    description: "Sort order",
    example: 0,
    required: false,
    default: 0,
  })
  @IsNumber()
  @Min(0)
  @IsOptional()
  sortOrder?: number;
}
