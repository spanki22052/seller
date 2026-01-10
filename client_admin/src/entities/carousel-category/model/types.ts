export interface CarouselCategory {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCarouselCategoryDto {
  name: string;
}

export interface UpdateCarouselCategoryDto {
  name?: string;
}
