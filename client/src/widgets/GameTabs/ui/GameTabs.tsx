"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { useReducedMotion } from "@/shared/lib/hooks/useReducedMotion";
import { getCategories, categoryKeys, Category } from "@/entities/category";
import * as Styled from "./styled";

interface GameTabsProps {
  onCategoryChange?: (categoryId: string | null) => void;
}

export function GameTabs({ onCategoryChange }: GameTabsProps) {
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const { data: categories = [], isLoading } = useQuery({
    queryKey: categoryKeys.lists(),
    queryFn: getCategories,
  });

  const handleCategoryClick = (categoryId: string | null) => {
    setActiveCategoryId(categoryId);
    onCategoryChange?.(categoryId);
  };

  if (isLoading) {
    return (
      <Styled.Container>
        <Styled.LoadingTab as={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          Загрузка...
        </Styled.LoadingTab>
      </Styled.Container>
    );
  }

  return (
    <Styled.Container>
      {/* Все категории button */}
      <Styled.Tab
        key="all"
        $active={activeCategoryId === null}
        onClick={() => handleCategoryClick(null)}
        as={motion.button}
        whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
        whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
      >
        Все
      </Styled.Tab>

      {categories.map((category: Category) => (
        <Styled.Tab
          key={category.id}
          $active={activeCategoryId === category.id}
          onClick={() => handleCategoryClick(category.id)}
          as={motion.button}
          whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
          whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
        >
          {category.name}
        </Styled.Tab>
      ))}
    </Styled.Container>
  );
}

