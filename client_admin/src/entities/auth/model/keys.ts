export const authKeys = {
  all: ["auth"] as const,
  detail: (id: string) => [...authKeys.all, "detail", id] as const,
  current: () => [...authKeys.all, "current"] as const,
};

