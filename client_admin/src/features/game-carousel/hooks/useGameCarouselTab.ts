"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { message } from "antd";
import { getGames, gameKeys, Game } from "@/entities/game";
import {
  getCarouselCategories,
  carouselCategoryKeys,
} from "@/entities/carousel-category";
import { CarouselCategoryGames } from "@/entities/settings/api/settingsApi";

interface UseGameCarouselTabProps {
  value?: string[];
  onChange?: (gameIds: string[]) => void;
  carouselData?: CarouselCategoryGames[];
  onCarouselDataChange?: (data: CarouselCategoryGames[]) => void;
}

export function useGameCarouselTab({
  value = [],
  onChange,
}: UseGameCarouselTabProps) {
  const { t } = useTranslation();
  const [selectedGameId, setSelectedGameId] = useState<string>("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null
  );

  // Use value directly instead of local state to avoid sync issues
  const currentGameIds = value || [];

  const { data: games = [], isLoading: isGamesLoading } = useQuery({
    queryKey: gameKeys.lists(),
    queryFn: getGames,
  });

  // Debug currentGameIds
  console.log(
    "useGameCarouselTab: currentGameIds (value)",
    currentGameIds,
    typeof currentGameIds
  );

  const {
    data: carouselCategories = [],
    isLoading: isCarouselCategoriesLoading,
  } = useQuery({
    queryKey: carouselCategoryKeys.lists(),
    queryFn: getCarouselCategories,
  });

  // Set default category to first available category when categories load
  React.useEffect(() => {
    if (carouselCategories.length > 0 && selectedCategoryId === null) {
      setSelectedCategoryId(carouselCategories[0].id);
    }
  }, [carouselCategories, selectedCategoryId]);

  // Filter games by category and exclude already selected games
  const availableGames = React.useMemo(() => {
    // Ensure we have valid games array
    if (!Array.isArray(games) || games.length === 0) {
      console.log("No games available");
      return [];
    }

    // Ensure currentGameIds is a valid array and normalize to strings
    const normalizedCurrentIds = Array.isArray(currentGameIds)
      ? currentGameIds
          .filter((id) => id != null && id !== "")
          .map((id) => String(id))
      : [];

    console.log("Normalized current IDs:", normalizedCurrentIds);

    // Filter out games that are already in the carousel
    let filtered = games.filter((game) => {
      if (!game || !game.id) {
        console.log("Skipping invalid game:", game);
        return false;
      }

      const gameId = String(game.id);
      const isAlreadySelected = normalizedCurrentIds.includes(gameId);

      console.log(
        `Game ${game.name} (${gameId}): already selected = ${isAlreadySelected}`
      );

      return !isAlreadySelected;
    });

    console.log("After filtering already selected games:", filtered.length);

    // Always filter by carousel category - require category selection

    console.log(
      "Final available games:",
      filtered.map((g) => g.name)
    );
    return filtered;
  }, [games, currentGameIds, selectedCategoryId]);

  // Clear selected game if it's no longer available in the filtered list
  React.useEffect(() => {
    if (
      selectedGameId &&
      !availableGames.some((game) => game.id === selectedGameId)
    ) {
      setSelectedGameId("");
    }
  }, [availableGames, selectedGameId]);

  const selectedGames = React.useMemo(() => {
    // Ensure currentGameIds is an array of strings
    const normalizedGameIds = Array.isArray(currentGameIds)
      ? currentGameIds.map((id) => String(id))
      : [];

    return games.filter((game) => {
      const gameId = String(game.id);
      return normalizedGameIds.includes(gameId);
    });
  }, [games, currentGameIds]);

  const handleAddGame = () => {
    if (!selectedGameId) {
      console.log("handleAddGame: no selectedGameId");
      return;
    }

    console.log("handleAddGame: currentGameIds before", currentGameIds);
    console.log("handleAddGame: adding gameId", selectedGameId);

    const newGameIds = [...(currentGameIds || []), selectedGameId];
    console.log("handleAddGame: newGameIds", newGameIds);

    onChange?.(newGameIds);

    setSelectedGameId("");
    message.success(t("settings.gameAdded"));
  };

  const handleDelete = (gameId: string) => {
    const newGameIds = currentGameIds.filter((id) => id !== gameId);
    onChange?.(newGameIds);

    message.success(t("settings.gameRemoved"));
  };

  const handleEdit = (game: Game) => {
    setSelectedGame(game);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedGame(null);
  };

  return {
    // State
    selectedGameId,
    setSelectedGameId,
    isEditModalOpen,
    selectedGame,
    selectedCategoryId,
    setSelectedCategoryId,

    // Data
    games,
    carouselCategories,
    availableGames,
    selectedGames,
    currentGameIds,

    // Loading states
    isGamesLoading,
    isCarouselCategoriesLoading,

    // Handlers
    handleAddGame,
    handleDelete,
    handleEdit,
    handleCloseEditModal,

    // Translation
    t,
  };
}
