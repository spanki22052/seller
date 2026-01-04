import { ApiProperty } from "@nestjs/swagger";
import { GameResponseDto } from "./game-response.dto";
import { CheatResponseDto } from "../../cheats/dto/cheat-response.dto";

export class GameWithCheatsResponseDto extends GameResponseDto {
  @ApiProperty({
    description: "List of cheats for this game",
    type: [CheatResponseDto],
  })
  cheats!: CheatResponseDto[];
}

