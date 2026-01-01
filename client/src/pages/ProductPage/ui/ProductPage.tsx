"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { Sidebar } from "@/widgets/Sidebar";
import { Navbar } from "@/shared/ui/Navbar";
import { ProductHero } from "@/widgets/ProductHero";
import { ProductScreenshots } from "@/widgets/ProductScreenshots";
import { ProductFeatures } from "@/widgets/ProductFeatures";
import { ProductVideo } from "@/widgets/ProductVideo";
import { ProductSecurity } from "@/widgets/ProductSecurity";
import { cheatCards, type CheatCard } from "@/widgets/CheatCards/mocks/mock";
import * as Styled from "./styled";

export const ProductPage = () => {
  const searchParams = useSearchParams();
  const cheatId = searchParams.get("id") || "1";
  
  // Get cheat data by ID, fallback to first cheat if not found
  const selectedCheat: CheatCard = 
    cheatCards.find((cheat) => cheat.id === cheatId) || cheatCards[0];

  return (
    <Styled.PageContainer>
      <Sidebar />
      <Styled.MainContent>
        <Navbar />
        <Styled.ContentWrapper>
          <ProductHero cheat={selectedCheat} />
          <ProductScreenshots />
          <ProductFeatures />
          <ProductVideo />
          <ProductSecurity />
        </Styled.ContentWrapper>
      </Styled.MainContent>
    </Styled.PageContainer>
  );
};

export default ProductPage;

