import { getApiClient } from '@/shared/api/base';
import { Faq, CreateFaqDto, UpdateFaqDto } from '../model/types';

export const getFaqs = (): Promise<Faq[]> => {
  return getApiClient().get<Faq[]>('/faqs').then(res => res.data);
};

export const getActiveFaqs = (): Promise<Faq[]> => {
  return getApiClient().get<Faq[]>('/faqs/active').then(res => res.data);
};

export const getFaqById = (id: string): Promise<Faq> => {
  return getApiClient().get<Faq>(`/faqs/${id}`).then(res => res.data);
};

export const createFaq = (dto: CreateFaqDto): Promise<Faq> => {
  return getApiClient().post<Faq>('/faqs', dto).then(res => res.data);
};

export const updateFaq = (id: string, dto: UpdateFaqDto): Promise<Faq> => {
  return getApiClient().put<Faq>(`/faqs/${id}`, dto).then(res => res.data);
};

export const deleteFaq = (id: string): Promise<void> => {
  return getApiClient().delete(`/faqs/${id}`);
};
