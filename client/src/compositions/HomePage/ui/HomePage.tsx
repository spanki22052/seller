"use client";

import React from "react";
import { Sidebar } from "@/widgets/Sidebar";
import { MainCard } from "@/widgets/MainCard";
import { GameTabs } from "@/widgets/GameTabs";
import { GameGrid } from "@/widgets/GameGrid";
import { GameIcons } from "@/widgets/GameIcons";
import { AccountBanner } from "@/widgets/AccountBanner";
import { InfoBanner } from "@/widgets/InfoBanner";
import { OfficialEmailInfo } from "@/widgets/OfficialEmailInfo";
import * as Styled from "./styled";

export function HomePage() {
  return (
    <>
      <Sidebar />
      <Styled.Container>
        <Styled.MainContent>
          <MainCard />
          <GameIcons />
          <Styled.GamesSection>
            <GameTabs />
          </Styled.GamesSection>
          <GameGrid />
          <AccountBanner />
          <Styled.GamesSection>
            <GameTabs />
          </Styled.GamesSection>

          <GameGrid />
          <InfoBanner />

          <GameGrid />
          <OfficialEmailInfo />
        </Styled.MainContent>
      </Styled.Container>
    </>
  );
}

// Default export for Next.js type checking (this is not a Next.js page, but a FSD page composition)
export default HomePage;
