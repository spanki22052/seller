"use client";

import dynamic from "next/dynamic";
import { useState, useMemo } from "react";
import { Sidebar } from "@/widgets/Sidebar";
import { useSidebar } from "@/shared/contexts/SidebarContext";
import { CheatsList } from "@/widgets/CheatsList";
import { Footer } from "@/widgets/Footer";
import { SearchOutlined } from "@ant-design/icons";
import { GameWithCheats } from "@/entities/game";
import { GameStatuses } from "./GameStatuses";
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
  gameData: GameWithCheats;
}

export function GamePage({ gameData }: GamePageProps) {
  const { isSidebarOpen, closeSidebar } = useSidebar();
  const [brandFilter, setBrandFilter] = useState("");

  // Фильтруем DLC по бренду
  const filteredCheats = useMemo(() => {
    if (!brandFilter.trim()) {
      return gameData.cheats;
    }

    return gameData.cheats.filter((cheat) =>
      cheat.brandName.toLowerCase().includes(brandFilter.toLowerCase())
    );
  }, [gameData.cheats, brandFilter]);

  return (
    <>
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
