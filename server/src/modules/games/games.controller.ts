import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from "@nestjs/swagger";
import { GamesService } from "./games.service";
import { CreateGameDto } from "./dto/create-game.dto";
import { UpdateGameDto } from "./dto/update-game.dto";
import { GameResponseDto } from "./dto/game-response.dto";
import { GameWithCheatsResponseDto } from "./dto/game-with-cheats-response.dto";

@ApiTags("games")
@Controller("games")
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: "Create a new game" })
  @ApiResponse({
    status: 201,
    description: "Game created successfully",
    type: GameResponseDto,
  })
  async create(@Body() createGameDto: CreateGameDto): Promise<GameResponseDto> {
    return this.gamesService.create(createGameDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all games" })
  @ApiResponse({
    status: 200,
    description: "List of all games",
    type: [GameResponseDto],
  })
  async findAll(): Promise<GameResponseDto[]> {
    return this.gamesService.findAll();
  }

  @Get("with-cheats")
  @ApiOperation({ summary: "Get all games with their cheats" })
  @ApiResponse({
    status: 200,
    description: "List of all games with cheats",
    type: [GameWithCheatsResponseDto],
  })
  async findAllWithCheats(): Promise<GameWithCheatsResponseDto[]> {
    return this.gamesService.findAllWithCheats();
  }

  @Get("search")
  @ApiOperation({ summary: "Search games and cheats by query" })
  @ApiQuery({ name: "q", description: "Search query", required: true })
  @ApiResponse({
    status: 200,
    description: "List of games with matching cheats",
    type: [GameWithCheatsResponseDto],
  })
  async search(@Query("q") query: string): Promise<GameWithCheatsResponseDto[]> {
    return this.gamesService.search(query);
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a game by ID" })
  @ApiParam({ name: "id", description: "Game ID" })
  @ApiResponse({
    status: 200,
    description: "Game found",
    type: GameResponseDto,
  })
  @ApiResponse({ status: 404, description: "Game not found" })
  async findOne(@Param("id") id: string): Promise<GameResponseDto> {
    return this.gamesService.findOne(id);
  }

  @Get(":id/with-cheats")
  @ApiOperation({ summary: "Get a game by ID with all its cheats" })
  @ApiParam({ name: "id", description: "Game ID" })
  @ApiResponse({
    status: 200,
    description: "Game with cheats found",
    type: GameWithCheatsResponseDto,
  })
  @ApiResponse({ status: 404, description: "Game not found" })
  async findOneWithCheats(@Param("id") id: string): Promise<GameWithCheatsResponseDto> {
    return this.gamesService.findOneWithCheats(id);
  }

  @Put(":id")
  @ApiOperation({ summary: "Update a game" })
  @ApiParam({ name: "id", description: "Game ID" })
  @ApiResponse({
    status: 200,
    description: "Game updated successfully",
    type: GameResponseDto,
  })
  @ApiResponse({ status: 404, description: "Game not found" })
  async update(
    @Param("id") id: string,
    @Body() updateGameDto: UpdateGameDto,
  ): Promise<GameResponseDto> {
    return this.gamesService.update(id, updateGameDto);
  }
}

