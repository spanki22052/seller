import { getApiClient } from '@/shared/api/base';
import { CarouselCategory, CreateCarouselCategoryDto, UpdateCarouselCategoryDto } from '../model/types';

export const getCarouselCategories = (): Promise<CarouselCategory[]> => {
  return getApiClient().get<CarouselCategory[]>('/carousel-categories').then(res => res.data);
};

export const getCarouselCategoryById = (id: string): Promise<CarouselCategory> => {
  return getApiClient().get<CarouselCategory>(`/carousel-categories/${id}`).then(res => res.data);
};

export const createCarouselCategory = (dto: CreateCarouselCategoryDto): Promise<CarouselCategory> => {
  return getApiClient().post<CarouselCategory>('/carousel-categories', dto).then(res => res.data);
};

export const updateCarouselCategory = (id: string, dto: UpdateCarouselCategoryDto): Promise<CarouselCategory> => {
  return getApiClient().put<CarouselCategory>(`/carousel-categories/${id}`, dto).then(res => res.data);
};

export const deleteCarouselCategory = (id: string): Promise<void> => {
  return getApiClient().delete(`/carousel-categories/${id}`);
};
