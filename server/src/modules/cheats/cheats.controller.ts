import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  HttpCode,
  HttpStatus,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from "@nestjs/swagger";
import { CheatsService } from "./cheats.service";
import { CreateCheatDto } from "./dto/create-cheat.dto";
import { UpdateCheatDto } from "./dto/update-cheat.dto";
import { CheatResponseDto } from "./dto/cheat-response.dto";

@ApiTags("cheats")
@Controller("cheats")
export class CheatsController {
  constructor(private readonly cheatsService: CheatsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: "Create a new cheat" })
  @ApiResponse({
    status: 201,
    description: "Cheat created successfully",
    type: CheatResponseDto,
  })
  @ApiResponse({ status: 400, description: "Invalid game ID" })
  async create(@Body() createCheatDto: CreateCheatDto): Promise<CheatResponseDto> {
    return this.cheatsService.create(createCheatDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all cheats" })
  @ApiResponse({
    status: 200,
    description: "List of all cheats",
    type: [CheatResponseDto],
  })
  async findAll(): Promise<CheatResponseDto[]> {
    return this.cheatsService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a cheat by ID" })
  @ApiParam({ name: "id", description: "Cheat ID" })
  @ApiResponse({
    status: 200,
    description: "Cheat found",
    type: CheatResponseDto,
  })
  @ApiResponse({ status: 404, description: "Cheat not found" })
  async findOne(@Param("id") id: string): Promise<CheatResponseDto> {
    return this.cheatsService.findOne(id);
  }

  @Put(":id")
  @ApiOperation({ summary: "Update a cheat" })
  @ApiParam({ name: "id", description: "Cheat ID" })
  @ApiResponse({
    status: 200,
    description: "Cheat updated successfully",
    type: CheatResponseDto,
  })
  @ApiResponse({ status: 404, description: "Cheat not found" })
  @ApiResponse({ status: 400, description: "Invalid game ID" })
  async update(
    @Param("id") id: string,
    @Body() updateCheatDto: UpdateCheatDto,
  ): Promise<CheatResponseDto> {
    return this.cheatsService.update(id, updateCheatDto);
  }
}

