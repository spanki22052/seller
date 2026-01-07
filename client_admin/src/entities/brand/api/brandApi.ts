import { getApiClient } from '@/shared/api/base';
import { Brand, CreateBrandDto, UpdateBrandDto } from '../model/types';

export const getBrands = (): Promise<Brand[]> => {
  return getApiClient().get<Brand[]>('/brands').then(res => res.data);
};

export const getBrandById = (id: string): Promise<Brand> => {
  return getApiClient().get<Brand>(`/brands/${id}`).then(res => res.data);
};

export const createBrand = (dto: CreateBrandDto): Promise<Brand> => {
  return getApiClient().post<Brand>('/brands', dto).then(res => res.data);
};

export const updateBrand = (id: string, dto: UpdateBrandDto): Promise<Brand> => {
  return getApiClient().put<Brand>(`/brands/${id}`, dto).then(res => res.data);
};

export const deleteBrand = (id: string): Promise<void> => {
  return getApiClient().delete(`/brands/${id}`);
};
