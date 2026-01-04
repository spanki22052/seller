export const cheatKeys = {
  all: ["cheats"] as const,
  lists: () => [...cheatKeys.all, "list"] as const,
  list: (filters: Record<string, unknown>) =>
    [...cheatKeys.lists(), filters] as const,
  details: () => [...cheatKeys.all, "detail"] as const,
  detail: (id: string) => [...cheatKeys.details(), id] as const,
  stats: () => [...cheatKeys.all, "stats"] as const,
};

