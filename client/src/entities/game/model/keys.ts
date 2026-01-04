export const gameKeys = {
  all: ["games"] as const,
  lists: () => [...gameKeys.all, "list"] as const,
  list: (filters?: string) => [...gameKeys.lists(), { filters }] as const,
  details: () => [...gameKeys.all, "detail"] as const,
  detail: (id: string) => [...gameKeys.details(), id] as const,
  withCheats: (id: string) => [...gameKeys.details(), id, "with-cheats"] as const,
  allWithCheats: () => [...gameKeys.all, "all-with-cheats"] as const,
  search: (query: string) => [...gameKeys.all, "search", query] as const,
};

