import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllGamesWithCheats, gameKeys } from "@/entities/game";
import { MenuItem } from "../model/types";

export function useSidebarData() {
  const { data, isLoading, error } = useQuery({
    queryKey: gameKeys.allWithCheats(),
    queryFn: getAllGamesWithCheats,
    staleTime: 60 * 1000, // 1 minute - data is fresh for 1 minute
    // refetchOnMount defaults to true - will use cached data if fresh, or fetch if stale/missing
    refetchOnWindowFocus: false,
  });

  // Преобразуем данные из API в формат MenuItem с мемоизацией
  const menuItems: MenuItem[] = useMemo(() => {
    const baseItems: MenuItem[] = [
      { id: "home", label: "Главная", isCategory: true, href: "/" },
      { id: "personal-cabinet", label: "ЛИЧНЫЙ КАБИНЕТ", isCategory: true, href: "/personal-cabinet" },
      { id: "new-releases", label: "НОВИНКИ", isCategory: true, href: "/new-releases" },
    ];

    if (!data) {
      return baseItems;
    }

    const gameItems: MenuItem[] = data
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
  }, [data]);

  return {
    menuItems,
    isLoading,
    error,
  };
}

