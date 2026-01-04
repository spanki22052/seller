import { getApiClient } from "@/shared/api/base";
import { Cheat } from "../model/types";

export async function getCheat(id: string): Promise<Cheat> {
  const client = getApiClient();
  const response = await client.get<Cheat>(`/cheats/${id}`);
  return response.data;
}

