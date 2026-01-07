import { getApiClient } from '@/shared/api/base';
import { HomeLink, CreateHomeLinkDto, UpdateHomeLinkDto } from '../model/types';

export const getHomeLinks = (): Promise<HomeLink[]> => {
  return getApiClient().get<HomeLink[]>('/home-links').then(res => res.data);
};

export const getActiveHomeLinks = (): Promise<HomeLink[]> => {
  return getApiClient().get<HomeLink[]>('/home-links/active').then(res => res.data);
};

export const getHomeLinkById = (id: string): Promise<HomeLink> => {
  return getApiClient().get<HomeLink>(`/home-links/${id}`).then(res => res.data);
};

export const createHomeLink = (dto: CreateHomeLinkDto): Promise<HomeLink> => {
  return getApiClient().post<HomeLink>('/home-links', dto).then(res => res.data);
};

export const updateHomeLink = (id: string, dto: UpdateHomeLinkDto): Promise<HomeLink> => {
  return getApiClient().put<HomeLink>(`/home-links/${id}`, dto).then(res => res.data);
};

export const deleteHomeLink = (id: string): Promise<void> => {
  return getApiClient().delete(`/home-links/${id}`);
};
