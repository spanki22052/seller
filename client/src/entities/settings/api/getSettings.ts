import { getApiClient } from "@/shared/api/base";
import { Settings } from "../model/types";

export async function getSettings(): Promise<Settings> {
  const client = getApiClient();
  const response = await client.get<Settings>("/settings");
  return response.data;
}

