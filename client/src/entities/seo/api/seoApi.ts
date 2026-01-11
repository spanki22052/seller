import { getApiClient } from "@/shared/api/base";

export interface SeoPageData {
  id: string;
  pageType: string;
  keywords: string[];
  createdAt: string;
  updatedAt: string;
}

export async function getSeoPage(pageType: 'home' | 'games' | 'faq'): Promise<SeoPageData | null> {
  try {
    const response = await getApiClient().get<SeoPageData>(`/seo-pages/${pageType}`);
    return response.data;
  } catch (error) {
    // Return null if SEO page doesn't exist yet
    return null;
  }
}
