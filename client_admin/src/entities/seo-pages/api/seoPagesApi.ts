import { getApiClient } from '@/shared/api/base';
import { SeoPage, SeoPageType, UpdateSeoPageDto } from '../model/types';

export const getSeoPageByType = (pageType: SeoPageType): Promise<SeoPage | null> => {
  return getApiClient().get<SeoPage | null>(`/seo-pages/${pageType}`).then(res => res.data);
};

export const updateSeoPageByType = (pageType: SeoPageType, dto: UpdateSeoPageDto): Promise<SeoPage> => {
  return getApiClient().put<SeoPage>(`/seo-pages/${pageType}`, dto).then(res => res.data);
};

export const getAllSeoPages = (): Promise<SeoPage[]> => {
  return getApiClient().get<SeoPage[]>('/seo-pages').then(res => res.data);
};
