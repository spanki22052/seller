export const homeLinkKeys = {
  all: ['home-links'] as const,
  lists: () => [...homeLinkKeys.all, 'list'] as const,
  list: (filters: Record<string, any>) => [...homeLinkKeys.lists(), { filters }] as const,
  details: () => [...homeLinkKeys.all, 'detail'] as const,
  detail: (id: string) => [...homeLinkKeys.details(), id] as const,
  active: () => [...homeLinkKeys.all, 'active'] as const,
};
