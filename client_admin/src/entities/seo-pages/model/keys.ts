export const seoPagesKeys = {
  all: ['seo-pages'] as const,
  lists: () => [...seoPagesKeys.all, 'list'] as const,
  list: (filters: Record<string, any>) => [...seoPagesKeys.lists(), { filters }] as const,
  details: () => [...seoPagesKeys.all, 'detail'] as const,
  detail: (pageType: string) => [...seoPagesKeys.details(), pageType] as const,
};
