import { getApiClient } from "@/shared/api/base";

export interface Settings {
  id: string;
  howToBuyVideoUrl?: string;
  howToBuyVideoThumbnail?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateSettingsDto {
  howToBuyVideoUrl?: string;
  howToBuyVideoThumbnail?: string;
}

export async function getSettings(): Promise<Settings> {
  const client = getApiClient();
  const response = await client.get<Settings>("/settings");
  return response.data;
}

export async function updateSettings(data: UpdateSettingsDto): Promise<Settings> {
  const client = getApiClient();
  const response = await client.put<Settings>("/settings", data);
  return response.data;
}

