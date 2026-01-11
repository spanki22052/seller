"use client";

import dynamic from "next/dynamic";
import { useState, useMemo } from "react";
import { Sidebar } from "@/widgets/Sidebar";
import { useSidebar } from "@/shared/contexts/SidebarContext";
import { CheatsList } from "@/widgets/CheatsList";
import { Footer } from "@/widgets/Footer";
import { SearchOutlined } from "@ant-design/icons";
import { Game, getCheatsByGameId, gameKeys } from "@/entities/game";
import { useQuery } from "@tanstack/react-query";
import { GameStatuses } from "./GameStatuses";
import { SEOHead } from "@/shared/ui";
import * as Styled from "./styled";

const BeforeBuyInfo = dynamic(
  () =>
    import("@/widgets/BeforeBuyInfo").then((mod) => ({
      default: mod.BeforeBuyInfo,
    })),
  {
    ssr: false,
    loading: () => <div style={{ minHeight: 500 }} />,
  }
);

interface GamePageProps {
  gameData: Game;
}

export function GamePage({ gameData }: GamePageProps) {
  const { isSidebarOpen, closeSidebar } = useSidebar();
  const [brandFilter, setBrandFilter] = useState("");

  // Получаем читы для игры
  const { data: cheats = [], isLoading: cheatsLoading } = useQuery({
    queryKey: gameKeys.cheats(gameData.id),
    queryFn: () => getCheatsByGameId(gameData.id),
  });

  // Фильтруем читы по бренду
  const filteredCheats = useMemo(() => {
    if (!brandFilter.trim()) {
      return cheats;
    }

    return cheats.filter((cheat) =>
      cheat.brandName.toLowerCase().includes(brandFilter.toLowerCase())
    );
  }, [cheats, brandFilter]);

  // SEO data
  const seoTitle = `${gameData.name} - Читы и хаки | Скачать приватные читы`;
  const seoDescription = gameData.categoryName
    ? `Лучшие читы для ${gameData.name} в категории ${gameData.categoryName}. Скачайте приватные читы с гарантией безопасности.`
    : `Лучшие читы для ${gameData.name}. Скачайте приватные читы с гарантией безопасности.`;
  const seoKeywords = gameData.seoText || `${gameData.name}, читы, cheats, hack, aimbot, приватные читы`;

  return (
    <>
      <SEOHead
        title={seoTitle}
        description={seoDescription}
        keywords={seoKeywords}
      />
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
      <Styled.Container>
        <Styled.MainContent>
          <Styled.SearchWrapper>
            <Styled.SearchInput
              placeholder="Поиск..."
              prefix={<SearchOutlined />}
              size="large"
              value={brandFilter}
              onChange={(e) => setBrandFilter(e.target.value)}
            />
          </Styled.SearchWrapper>
          <GameStatuses cheats={filteredCheats} />
          <CheatsList cheats={filteredCheats} gameId={gameData.id} />
          <BeforeBuyInfo />
        </Styled.MainContent>

        <Footer />
      </Styled.Container>
    </>
  );
}

// Default export for Next.js type checking (this is not a Next.js page, but a FSD page composition)
export default GamePage;
