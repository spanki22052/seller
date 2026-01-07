import { getApiClient } from '@/shared/api/base';
import { HomeLink } from '../model/types';

export const getActiveHomeLinks = (): Promise<HomeLink[]> => {
  return getApiClient().get<HomeLink[]>('/home-links/active').then(res => res.data);
};
