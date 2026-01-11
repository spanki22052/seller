import { getApiClient } from "@/shared/api/base";

export type FooterLink = {
  label: string;
  href: string;
};

export type SupportLink = {
  label: string;
  href: string;
};

export type CarouselCategoryGames = {
  id: string;
  games: string[];
};

export interface Settings {
  id: string;
  howToBuyVideoUrl?: string;
  howToBuyVideoThumbnail?: string;
  gameIdsForIcons?: string[];
  gameIdsForCarousel?: CarouselCategoryGames[];
  footerLinks?: FooterLink[];
  supportLinks?: SupportLink[];
  supportLink?: string;
  sellerId?: string;
  iconUrl?: string;
  mainPageTitle?: string;
  mainPageDescription?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateSettingsDto {
  howToBuyVideoUrl?: string;
  howToBuyVideoThumbnail?: string;
  gameIdsForIcons?: string[];
  gameIdsForCarousel?: CarouselCategoryGames[];
  footerLinks?: FooterLink[];
  supportLinks?: SupportLink[];
  supportLink?: string;
  sellerId?: string;
  iconUrl?: string;
  mainPageTitle?: string;
  mainPageDescription?: string;
}

export async function getSettings(): Promise<Settings> {
  const client = getApiClient();
  const response = await client.get<Settings>("/settings");
  return response.data;
}

export async function updateSettings(
  data: UpdateSettingsDto
): Promise<Settings> {
  const client = getApiClient();
  const response = await client.put<Settings>("/settings", data);
  return response.data;
}
