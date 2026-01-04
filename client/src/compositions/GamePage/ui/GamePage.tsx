"use client";

import dynamic from "next/dynamic";
import { Sidebar } from "@/widgets/Sidebar";
import { CheatsList } from "@/widgets/CheatsList";
import { AccountShop } from "@/shared/ui/AccountShop";
import { OfficialEmailInfo } from "@/widgets/OfficialEmailInfo";
import { GameWithCheats } from "@/entities/game";
import * as Styled from "./styled";
import { Navbar } from "@/shared/ui/Navbar";

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
  return (
    <>
      <Sidebar />
      <Navbar />
      <Styled.Container>
        <Styled.MainContent>
          <GameHero gameData={gameData} />
          <CheatsList cheats={gameData.cheats} gameId={gameData.id} />
          <AccountShop />
          <BeforeBuyInfo />
        </Styled.MainContent>

        <OfficialEmailInfo />
      </Styled.Container>
    </>
  );
}

// Default export for Next.js type checking (this is not a Next.js page, but a FSD page composition)
export default GamePage;
