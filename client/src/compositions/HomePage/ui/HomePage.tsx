"use client";

import React from "react";
import dynamic from "next/dynamic";
import { Sidebar } from "@/widgets/Sidebar";
import { useSidebar } from "@/shared/contexts/SidebarContext";
import { MainCard } from "@/widgets/MainCard";
import { GameTabs } from "@/widgets/GameTabs";
import { GameGrid } from "@/widgets/GameGrid";
import { GameIcons } from "@/widgets/GameIcons";
import { Footer } from "@/widgets/Footer";
import * as Styled from "./styled";

const AccountBanner = dynamic(
  () =>
    import("@/widgets/AccountBanner").then((mod) => ({
      default: mod.AccountBanner,
    })),
  {
    ssr: false,
    loading: () => <div style={{ minHeight: 400 }} />,
  }
);

const InfoBanner = dynamic(
  () =>
    import("@/widgets/InfoBanner").then((mod) => ({ default: mod.InfoBanner })),
  {
    ssr: false,
    loading: () => <div style={{ minHeight: 400 }} />,
  }
);

export function HomePage() {
  const { isSidebarOpen, closeSidebar } = useSidebar();
  const [selectedCategoryId, setSelectedCategoryId] = React.useState<
    string | null
  >(null);

  return (
    <>
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
      <Styled.Container>
        <Styled.MainContent>
          <MainCard />
          <GameIcons />
          <Styled.GamesSection>
            <GameTabs onCategoryChange={setSelectedCategoryId} />
          </Styled.GamesSection>

          <GameGrid categoryId={selectedCategoryId} />
          <InfoBanner />

          <Footer />
        </Styled.MainContent>
      </Styled.Container>
    </>
  );
}

// Default export for Next.js type checking (this is not a Next.js page, but a FSD page composition)
export default HomePage;
