import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsOptional, IsUUID } from "class-validator";

export class CreateGameDto {
  @ApiProperty({
    description: "Game name",
    example: "Battlefield 2042",
  })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({
    description: "Game color theme (hex code)",
    example: "#FF5733",
  })
  @IsString()
  @IsNotEmpty()
  color!: string;

  @ApiProperty({
    description: "Game category ID",
    example: "cm0q8x8x8x8x8x8x8x8x8",
    required: false,
  })
  @IsString()
  @IsOptional()
  categoryId?: string;

  @ApiProperty({
    description: "Game image URL",
    example: "/images/games/battlefield-2042.png",
    required: false,
  })
  @IsString()
  @IsOptional()
  image?: string;

  @ApiProperty({
    description: "Game background image URL (jpg, jpeg, png)",
    example: "/images/games/battlefield-2042-background.jpg",
    required: false,
  })
  @IsString()
  @IsOptional()
  backgroundImage?: string;

  @ApiProperty({
    description: "Game icon image URL",
    example: "/images/games/battlefield-2042-icon.png",
    required: false,
  })
  @IsString()
  @IsOptional()
  icon?: string;
}
