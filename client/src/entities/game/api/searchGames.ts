import { getApiClient } from "@/shared/api/base";
import { GameWithCheats } from "../model/types";

export async function searchGames(query: string): Promise<GameWithCheats[]> {
  if (!query || query.trim().length === 0) {
    return [];
  }

  const client = getApiClient();
  const response = await client.get<GameWithCheats[]>("/games/search", {
    params: { q: query.trim() },
  });
  return response.data;
}

