import {
  Controller,
  Get,
  Put,
  Body,
  UseGuards,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from "@nestjs/swagger";
import { SettingsService } from "./settings.service";
import { UpdateSettingsDto } from "./dto/update-settings.dto";
import { SettingsResponseDto } from "./dto/settings-response.dto";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { Public } from "../auth/decorators/public.decorator";

@ApiTags("settings")
@Controller("settings")
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get()
  @Public()
  @ApiOperation({ summary: "Get settings" })
  @ApiResponse({
    status: 200,
    description: "Settings retrieved successfully",
    type: SettingsResponseDto,
  })
  async getSettings(): Promise<SettingsResponseDto> {
    return this.settingsService.getSettings();
  }

  @Put()
  @ApiOperation({ summary: "Update settings" })
  @ApiResponse({
    status: 200,
    description: "Settings updated successfully",
    type: SettingsResponseDto,
  })
  async updateSettings(
    @Body() updateSettingsDto: UpdateSettingsDto,
  ): Promise<SettingsResponseDto> {
    return this.settingsService.updateSettings(updateSettingsDto);
  }
}

