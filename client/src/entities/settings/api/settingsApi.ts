import { getApiClient } from "@/shared/api/base";

export interface FooterLink {
  label: string;
  href: string;
}

export interface SupportLink {
  label: string;
  href: string;
}

export interface FooterLabel {
  label: string;
  href?: string;
}

export type CarouselCategoryGames = {
  id: string;
  games: string[];
};

export interface Settings {
  iconUrl: string | Blob | undefined;
  id: string;
  sellerId?: string;
  howToBuyVideoUrl?: string;
  howToBuyVideoThumbnail?: string;
  gameIdsForIcons?: string[];
  gameIdsForCarousel?: CarouselCategoryGames[];
  categoryIdForCarousel?: string;
  footerLinks?: FooterLink[];
  footerLabels?: FooterLabel[];
  supportLinks?: SupportLink[];
  mainPageTitle?: string;
  mainPageDescription?: string;
  createdAt: string;
  updatedAt: string;
}

export async function getSettings(): Promise<Settings> {
  const response = await getApiClient().get<Settings>("/settings");
  return response.data;
}
