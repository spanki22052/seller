import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsString } from "class-validator";

export class ReorderCheatsDto {
  @ApiProperty({
    description: "Array of cheat IDs in the desired order",
    example: ["clx1234567890abcdef", "clx9876543210fedcba"],
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  cheatIds!: string[];
}
