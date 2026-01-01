"use client";

import React from "react";
import { Sidebar } from "@/widgets/Sidebar";
import { Navbar } from "@/shared/ui/Navbar";
import { ExploreHero } from "@/widgets/ExploreHero";
import { ExploreSearchFilters } from "@/widgets/ExploreSearchFilters";
import { CheatCardsGrid } from "@/widgets/CheatCardsGrid";
import * as Styled from "./styled";

/**
 * ExploreCheatsPage - Page component for exploring and browsing cheats
 * 
 * Note: This component is a composition component with no direct text content.
 * All child components (ExploreHero, ExploreSearchFilters, CheatCardsGrid, Sidebar, Navbar)
 * use i18next translations via useTranslation hook.
 */
export const ExploreCheatsPage = () => {
  return (
    <Styled.PageContainer>
      <Sidebar />
      <Styled.MainContent>
        <Navbar />
        <Styled.ContentWrapper>
          <ExploreHero />
          <ExploreSearchFilters />
          <CheatCardsGrid />
        </Styled.ContentWrapper>
      </Styled.MainContent>
    </Styled.PageContainer>
  );
};

