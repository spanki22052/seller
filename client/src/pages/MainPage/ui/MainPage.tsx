"use client";

import React from "react";
import { Sidebar } from "@/widgets/Sidebar";
import { Navbar } from "@/shared/ui/Navbar";
import { Hero } from "@/widgets/Hero";
import { Features } from "@/widgets/Features";
import { GameCards } from "@/widgets/GameCards";
import { AccountStore } from "@/widgets/AccountStore";
import * as Styled from "./styled";

export const MainPage = () => {
  return (
    <Styled.PageContainer>
      <Sidebar />
      <Styled.MainContent>
        <Navbar />
        <Hero />
        <Features />
        <GameCards />
        <AccountStore />
      </Styled.MainContent>
    </Styled.PageContainer>
  );
};
