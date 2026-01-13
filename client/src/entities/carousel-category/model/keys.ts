export const carouselCategoryKeys = {
  all: ["carousel-categories"] as const,
  lists: () => [...carouselCategoryKeys.all, "list"] as const,
  list: (filters: Record<string, unknown>) => [...carouselCategoryKeys.lists(), filters] as const,
  details: () => [...carouselCategoryKeys.all, "detail"] as const,
  detail: (id: string) => [...carouselCategoryKeys.details(), id] as const,
};
