import { getApiClient } from "@/shared/api/base";

export interface FooterLink {
  label: string;
  href: string;
}

export interface SupportLink {
  label: string;
  href: string;
}

export interface Settings {
  id: string;
  howToBuyVideoUrl?: string;
  howToBuyVideoThumbnail?: string;
  gameIdsForIcons?: string[];
  gameIdsForCarousel?: string[];
  categoryIdForCarousel?: string;
  footerLinks?: FooterLink[];
  supportLinks?: SupportLink[];
  createdAt: string;
  updatedAt: string;
}

export async function getSettings(): Promise<Settings> {
  const response = await getApiClient().get<Settings>("/settings");
  return response.data;
}
