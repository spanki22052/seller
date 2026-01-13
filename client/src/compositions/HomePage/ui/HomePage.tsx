"use client";

import React from "react";
import dynamic from "next/dynamic";
import { Sidebar } from "@/widgets/Sidebar";
import { useSidebar } from "@/shared/contexts/SidebarContext";
import { MainCard } from "@/widgets/MainCard";
import { GameCarouselTabs } from "@/widgets/GameCarouselTabs";
import { GameGrid } from "@/widgets/GameGrid";
import { GameIcons } from "@/widgets/GameIcons";
import { Footer } from "@/widgets/Footer";
import * as Styled from "./styled";

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
  const [selectedCarouselCategoryId, setSelectedCarouselCategoryId] =
    React.useState<string | null>(null);

  return (
    <>
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
      <Styled.Container>
        <Styled.MainContent>
          <MainCard />
          <GameIcons />

          <Styled.GamesSection>
            <GameCarouselTabs
              onCategoryChange={setSelectedCarouselCategoryId}
            />
          </Styled.GamesSection>

          <GameGrid carouselCategoryId={selectedCarouselCategoryId} />
          <InfoBanner />

          <Footer />
        </Styled.MainContent>
      </Styled.Container>
    </>
  );
}

export default HomePage;
