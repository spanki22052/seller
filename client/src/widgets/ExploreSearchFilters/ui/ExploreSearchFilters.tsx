"use client";

import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import * as Styled from "./styled";

const filters = ["all", "fps", "battleRoyale", "rpg", "undetectedOnly"] as const;

export const ExploreSearchFilters = () => {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <Styled.Container
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <Styled.SearchWrapper>
        <Styled.SearchIcon>search</Styled.SearchIcon>
        <Styled.SearchInput
          type="text"
          placeholder={t("explore.searchPlaceholder")}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </Styled.SearchWrapper>
      <Styled.FiltersWrapper>
        {filters.map((filter, index) => (
          <Styled.FilterButton
            key={filter}
            $active={activeFilter === filter}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: 0.1 + index * 0.05,
              duration: 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveFilter(filter)}
          >
            {t(`explore.${filter}`)}
            {filter !== "all" && filter !== "undetectedOnly" && (
              <Styled.FilterIcon>expand_more</Styled.FilterIcon>
            )}
          </Styled.FilterButton>
        ))}
      </Styled.FiltersWrapper>
    </Styled.Container>
  );
};

