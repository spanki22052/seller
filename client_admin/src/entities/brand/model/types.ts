export interface Brand {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBrandDto {
  name: string;
}

export interface UpdateBrandDto {
  name?: string;
}
