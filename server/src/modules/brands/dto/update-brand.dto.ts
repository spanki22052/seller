import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsOptional } from "class-validator";

export class UpdateBrandDto {
  @ApiProperty({
    description: "Brand name",
    example: "CROOKED",
    required: false,
  })
  @IsString()
  @IsOptional()
  name?: string;
}
