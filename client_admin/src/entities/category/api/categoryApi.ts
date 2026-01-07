import { getApiClient } from '@/shared/api/base';
import { Category, CreateCategoryDto, UpdateCategoryDto } from '../model/types';

export const getCategories = (): Promise<Category[]> => {
  return getApiClient().get<Category[]>('/categories').then(res => res.data);
};

export const getCategoryById = (id: string): Promise<Category> => {
  return getApiClient().get<Category>(`/categories/${id}`).then(res => res.data);
};

export const createCategory = (dto: CreateCategoryDto): Promise<Category> => {
  return getApiClient().post<Category>('/categories', dto).then(res => res.data);
};

export const updateCategory = (id: string, dto: UpdateCategoryDto): Promise<Category> => {
  return getApiClient().put<Category>(`/categories/${id}`, dto).then(res => res.data);
};

export const deleteCategory = (id: string): Promise<void> => {
  return getApiClient().delete(`/categories/${id}`);
};
