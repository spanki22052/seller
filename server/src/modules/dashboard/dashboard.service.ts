import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../shared/prisma/prisma.service";
import { DashboardStatsDto } from "./dto/dashboard-stats.dto";

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

  async getStats(): Promise<DashboardStatsDto> {
    // Get total cheats count
    const totalCheats = await this.prisma.cheat.count({
      where: { deletedAt: null },
    });

    // Get cheats by status
    const availableCheats = await this.prisma.cheat.count({
      where: { deletedAt: null, status: "AVAILABLE" },
    });

    const updatingCheats = await this.prisma.cheat.count({
      where: { deletedAt: null, status: "UPDATING" },
    });

    const frozenCheats = await this.prisma.cheat.count({
      where: { deletedAt: null, status: "FROZEN" },
    });

    // Get total games count
    const totalGames = await this.prisma.game.count({
      where: { deletedAt: null },
    });

    // Get active users count (users without deletedAt)
    const activeUsers = await this.prisma.user.count({
      where: { deletedAt: null },
    });

    // Placeholder values for sales and revenue
    // These can be calculated from orders/purchases table if exists in the future
    const totalSales = 0;
    const totalRevenue = 0;

    return {
      totalCheats,
      totalGames,
      availableCheats,
      updatingCheats,
      frozenCheats,
      totalSales,
      totalRevenue,
      activeUsers,
    };
  }
}

