"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { useReducedMotion } from "@/shared/lib/hooks/useReducedMotion";
import { getCarouselCategories, carouselCategoryKeys, CarouselCategory } from "@/entities/carousel-category";
import * as Styled from "./styled";

interface GameCarouselTabsProps {
  onCategoryChange?: (categoryId: string | null) => void;
}

export function GameCarouselTabs({ onCategoryChange }: GameCarouselTabsProps) {
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const { data: carouselCategories = [], isLoading } = useQuery({
    queryKey: carouselCategoryKeys.lists(),
    queryFn: getCarouselCategories,
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

      {carouselCategories.map((category: CarouselCategory) => (
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
