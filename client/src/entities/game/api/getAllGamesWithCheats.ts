import { getApiClient } from "@/shared/api/base";
import { GameWithCheats } from "../model/types";

export async function getAllGamesWithCheats(): Promise<GameWithCheats[]> {
  const client = getApiClient();
  const response = await client.get<GameWithCheats[]>("/games/with-cheats");
  return response.data;
}

