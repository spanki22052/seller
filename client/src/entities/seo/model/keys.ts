import { SeoPageType } from "./types";

export const seoKeys = {
  all: ['seo'] as const,
  page: (pageType: SeoPageType) => [...seoKeys.all, 'page', pageType] as const,
};
