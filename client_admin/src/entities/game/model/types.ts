export interface Game {
  id: string;
  name: string;
  color: string;
  image?: string;
  backgroundImage?: string;
  icon?: string;
  description?: string;
  genre?: string;
  cheatsCount?: number;
  totalSales?: number;
  averageRating?: number;
  status?: "active" | "inactive";
  createdAt: string;
  updatedAt: string;
}

export interface GameStats {
  total: number;
  active: number;
  inactive: number;
  totalCheats: number;
  totalSales: number;
}

