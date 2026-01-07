import { getApiClient } from '@/shared/api/base';
import { Faq } from '../model/types';

export const getActiveFaqs = (): Promise<Faq[]> => {
  return getApiClient().get<Faq[]>('/faqs/active').then(res => res.data);
};
