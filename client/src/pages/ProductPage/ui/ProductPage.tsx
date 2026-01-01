"use client";

import React from "react";
import { Sidebar } from "@/widgets/Sidebar";
import { Navbar } from "@/shared/ui/Navbar";
import { ProductHero } from "@/widgets/ProductHero";
import { ProductScreenshots } from "@/widgets/ProductScreenshots";
import { ProductFeatures } from "@/widgets/ProductFeatures";
import { ProductVideo } from "@/widgets/ProductVideo";
import { ProductSecurity } from "@/widgets/ProductSecurity";
import * as Styled from "./styled";

export const ProductPage = () => {
  return (
    <Styled.PageContainer>
      <Sidebar />
      <Styled.MainContent>
        <Navbar />
        <ProductHero />
        <ProductScreenshots />
        <ProductFeatures />
        <ProductVideo />
        <ProductSecurity />
      </Styled.MainContent>
    </Styled.PageContainer>
  );
};

