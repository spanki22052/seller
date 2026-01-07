import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllGamesWithCheats, gameKeys } from "@/entities/game";
import { getActiveHomeLinks, homeLinkKeys } from "@/entities/home-link";
import { MenuItem } from "../model/types";

export function useSidebarData() {
  const {
    data: gamesData,
    isLoading: isLoadingGames,
    error: gamesError,
  } = useQuery({
    queryKey: gameKeys.allWithCheats(),
    queryFn: getAllGamesWithCheats,
    staleTime: 60 * 1000, // 1 minute - data is fresh for 1 minute
    // refetchOnMount defaults to true - will use cached data if fresh, or fetch if stale/missing
    refetchOnWindowFocus: false,
  });

  const {
    data: homeLinksData,
    isLoading: isLoadingHomeLinks,
    error: homeLinksError,
  } = useQuery({
    queryKey: homeLinkKeys.active(),
    queryFn: getActiveHomeLinks,
    staleTime: 60 * 1000, // 1 minute - data is fresh for 1 minute
    refetchOnWindowFocus: false,
  });

  // Преобразуем данные из API в формат MenuItem с мемоизацией
  const menuItems: MenuItem[] = useMemo(() => {
    const baseItems: MenuItem[] = [
      {
        id: "home",
        label: "Главная",
        homeLinks: homeLinksData || [],
      },
    ];

    if (!gamesData) {
      return baseItems;
    }

    const gameItems: MenuItem[] = gamesData
      .filter((game) => game.cheats && game.cheats.length > 0)
      .map((game) => ({
        id: game.id,
        label: game.name.toUpperCase(),
        cheats: [
          {
            id: `${game.id}-main`,
            name: "Смотреть главную страницу",
          },
          ...game.cheats.map((cheat) => ({
            id: cheat.id,
            name: cheat.brandName,
          })),
        ],
      }));

    return [...baseItems, ...gameItems];
  }, [gamesData, homeLinksData]);

  return {
    menuItems,
    isLoading: isLoadingGames || isLoadingHomeLinks,
    error: gamesError || homeLinksError,
  };
}
