"use client";

import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { getAllGamesWithCheats, gameKeys } from "@/entities/game";

/**
 * Component that prefetches critical data before Sidebar and other components load
 * This ensures the games with cheats data is available immediately when Sidebar renders
 */
export function DataPrefetcher() {
  const queryClient = useQueryClient();

  useEffect(() => {
    // Prefetch games with cheats data immediately on mount
    // This ensures Sidebar has data ready when it renders
    queryClient.prefetchQuery({
      queryKey: gameKeys.allWithCheats(),
      queryFn: getAllGamesWithCheats,
      staleTime: 60 * 1000, // 1 minute
    });
  }, [queryClient]);

  return null;
}

