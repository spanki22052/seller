import { getApiClient } from "@/shared/api/base";
import { Game } from "../model/types";

export async function getGame(id: string): Promise<Game> {
  const client = getApiClient();
  const response = await client.get<Game>(`/games/${id}`);
  return response.data;
}

