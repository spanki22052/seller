import { getApiClient } from "@/shared/api/base";
import { Cheat } from "../model/types";

export async function getCheatsByGameId(id: string): Promise<Cheat[]> {
  const client = getApiClient();
  const response = await client.get<Cheat[]>(`/games/${id}/cheats`);
  return response.data;
}
