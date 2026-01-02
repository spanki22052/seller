"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/shared/lib/hooks/useReducedMotion";
import * as Styled from "./styled";

type TabType = "hit" | "soon";

export function GameTabs() {
  const [activeTab, setActiveTab] = useState<TabType>("hit");
  const prefersReducedMotion = useReducedMotion();

  const tabs: { id: TabType; label: string }[] = [
    { id: "hit", label: "Хит" },
    { id: "soon", label: "Скоро" },
  ];

  return (
    <Styled.Container>
      {tabs.map((tab) => (
        <Styled.Tab
          key={tab.id}
          $active={activeTab === tab.id}
          onClick={() => setActiveTab(tab.id)}
          as={motion.button}
          whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
          whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
        >
          {tab.label}
        </Styled.Tab>
      ))}
    </Styled.Container>
  );
}

