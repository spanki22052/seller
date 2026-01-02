"use client";

import { Sidebar } from "@/widgets/Sidebar";
import { GameHero } from "@/widgets/GameHero";
import { CheatsList } from "@/widgets/CheatsList";
import { BeforeBuyInfo } from "@/widgets/BeforeBuyInfo";
import { AccountShop } from "@/shared/ui/AccountShop";
import { OfficialEmailInfo } from "@/widgets/OfficialEmailInfo";
import * as Styled from "./styled";

interface GamePageProps {
  gameId: string;
}

export function GamePage({ gameId }: GamePageProps) {
  return (
    <>
      <Sidebar />
      <Styled.Container>
        <Styled.MainContent>
          <GameHero gameId={gameId} />
          <CheatsList gameId={gameId} />
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
