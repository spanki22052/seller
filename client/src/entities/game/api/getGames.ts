import { getApiClient } from "@/shared/api/base";
import { Game } from "../model/types";

export async function getGames(): Promise<Game[]> {
  const client = getApiClient();
  const response = await client.get<Game[]>("/games");
  return response.data;
}

