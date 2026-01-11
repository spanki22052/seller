export type SeoPageType = 'home' | 'games' | 'faq';

export interface SeoPage {
  id: string;
  pageType: SeoPageType;
  keywords: string[];
  createdAt: string;
  updatedAt: string;
}
