import { getApiClient } from "@/shared/api/base";

export interface DashboardStats {
  totalCheats: number;
  totalGames: number;
  availableCheats: number;
  updatingCheats: number;
  frozenCheats: number;
  totalSales: number;
  totalRevenue: number;
  activeUsers: number;
}

export async function getDashboardStats(): Promise<DashboardStats> {
  const response = await getApiClient().get<DashboardStats>("/dashboard/stats");
  return response.data;
}

