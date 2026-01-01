"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { CheatCard } from "@/widgets/CheatCard";
import { cheatCards } from "@/widgets/CheatCards/mocks/mock";
import * as Styled from "./styled";

export const CheatCardsGrid = () => {
  const { t } = useTranslation();

  return (
    <>
      <Styled.Grid>
        {cheatCards.map((cheat, index) => (
          <CheatCard key={cheat.id} cheat={cheat} index={index} />
        ))}
      </Styled.Grid>
      <Styled.LoadMoreWrapper
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <Styled.LoadMoreButton
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {t("explore.loadMore")}
          <Styled.LoadMoreIcon>expand_more</Styled.LoadMoreIcon>
        </Styled.LoadMoreButton>
      </Styled.LoadMoreWrapper>
    </>
  );
};

