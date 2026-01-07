"use client";

import dynamic from "next/dynamic";
import { Sidebar } from "@/widgets/Sidebar";
import { useSidebar } from "@/shared/contexts/SidebarContext";
import { CheatsList } from "@/widgets/CheatsList";
import { AccountShop } from "@/shared/ui/AccountShop";
import { Footer } from "@/widgets/Footer";
import { GameWithCheats } from "@/entities/game";
import * as Styled from "./styled";

const GameHero = dynamic(
  () => import("@/widgets/GameHero").then((mod) => ({ default: mod.GameHero })),
  {
    ssr: false,
    loading: () => <div style={{ minHeight: 600 }} />,
  }
);

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

  return (
    <>
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
      <Styled.Container>
        <Styled.MainContent>
          <GameHero gameData={gameData} />
          <CheatsList cheats={gameData.cheats} gameId={gameData.id} />
          <AccountShop />
          <BeforeBuyInfo />
        </Styled.MainContent>

        <Footer />
      </Styled.Container>
    </>
  );
}

// Default export for Next.js type checking (this is not a Next.js page, but a FSD page composition)
export default GamePage;
