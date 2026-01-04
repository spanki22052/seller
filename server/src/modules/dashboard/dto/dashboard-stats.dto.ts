import { ApiProperty } from "@nestjs/swagger";

export class DashboardStatsDto {
  @ApiProperty({ description: "Total number of cheats" })
  totalCheats!: number;

  @ApiProperty({ description: "Total number of games" })
  totalGames!: number;

  @ApiProperty({ description: "Number of available cheats" })
  availableCheats!: number;

  @ApiProperty({ description: "Number of updating cheats" })
  updatingCheats!: number;

  @ApiProperty({ description: "Number of frozen cheats" })
  frozenCheats!: number;

  @ApiProperty({ description: "Total sales count (placeholder - can be calculated from orders if exists)" })
  totalSales!: number;

  @ApiProperty({ description: "Total revenue (placeholder - can be calculated from orders if exists)" })
  totalRevenue!: number;

  @ApiProperty({ description: "Active users count (placeholder - can be calculated from users if exists)" })
  activeUsers!: number;
}

