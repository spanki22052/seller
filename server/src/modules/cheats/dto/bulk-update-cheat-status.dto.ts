import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsEnum, IsNotEmpty, IsString } from "class-validator";
import { CheatStatus } from "./create-cheat.dto";

export class BulkUpdateCheatStatusDto {
  @ApiProperty({
    description: "Array of cheat IDs to update",
    example: ["clx1234567890abcdef", "clx9876543210fedcba"],
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  ids!: string[];

  @ApiProperty({
    description: "New status for all selected cheats",
    enum: CheatStatus,
    example: CheatStatus.AVAILABLE,
  })
  @IsEnum(CheatStatus)
  status!: CheatStatus;
}
