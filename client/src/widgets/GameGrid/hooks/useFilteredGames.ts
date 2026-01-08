"use client";

import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { getGames, gameKeys } from "@/entities/game";
import { getSettings, settingsKeys } from "@/entities/settings";

interface UseFilteredGamesProps {
  categoryId?: string | null;
}

export function useFilteredGames({ categoryId }: UseFilteredGamesProps) {
  const { data: games = [], isLoading: isGamesLoading } = useQuery({
    queryKey: gameKeys.lists(),
    queryFn: getGames,
  });

  const { data: settings, isLoading: isSettingsLoading } = useQuery({
    queryKey: settingsKeys.detail(),
    queryFn: getSettings,
  });

  const filteredGames = useMemo(() => {
    let filtered = games;

    // First, filter by carousel games if configured
    if (settings?.gameIdsForCarousel) {
      filtered = filtered.filter((game) =>
        settings.gameIdsForCarousel!.includes(game.id)
      );
    }

    // Then filter by category if selected
    if (categoryId) {
      filtered = filtered.filter((game) => game.categoryId === categoryId);
    }

    return filtered;
  }, [games, settings, categoryId]);

  const hasGames = filteredGames.length > 0;
  const isLoading = isGamesLoading || isSettingsLoading;

  return {
    filteredGames,
    hasGames,
    isLoading,
  };
}
