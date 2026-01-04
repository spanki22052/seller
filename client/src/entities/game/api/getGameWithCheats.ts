import { getApiClient } from "@/shared/api/base";
import { GameWithCheats } from "../model/types";

export async function getGameWithCheats(id: string): Promise<GameWithCheats> {
  const client = getApiClient();
  const response = await client.get<GameWithCheats>(`/games/${id}/with-cheats`);
  return response.data;
}

