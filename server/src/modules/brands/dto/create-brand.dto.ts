import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty } from "class-validator";

export class CreateBrandDto {
  @ApiProperty({
    description: "Brand name",
    example: "CROOKED",
  })
  @IsString()
  @IsNotEmpty()
  name!: string;
}
