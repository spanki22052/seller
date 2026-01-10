import { useQuery } from "@tanstack/react-query";
import { getCheat } from "./getCheat";
import { cheatKeys } from "../model/keys";

export function useCheat(cheatId: string) {
  return useQuery({
    queryKey: cheatKeys.detail(cheatId),
    queryFn: () => getCheat(cheatId),
    enabled: !!cheatId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}
