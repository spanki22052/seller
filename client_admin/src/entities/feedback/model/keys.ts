export const feedbackKeys = {
  all: ["feedbacks"] as const,
  lists: () => [...feedbackKeys.all, "list"] as const,
  list: (filters: Record<string, unknown>) =>
    [...feedbackKeys.lists(), filters] as const,
  details: () => [...feedbackKeys.all, "detail"] as const,
  detail: (id: string) => [...feedbackKeys.details(), id] as const,
  stats: () => [...feedbackKeys.all, "stats"] as const,
};

