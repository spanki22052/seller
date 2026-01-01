"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import * as Styled from "./styled";

export const ExploreHero = () => {
  const { t } = useTranslation();

  return (
    <Styled.HeroSection
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <Styled.ContentWrapper>
        <Styled.TextSection>
          <Styled.Title>{t("explore.title")}</Styled.Title>
          <Styled.Description>{t("explore.description")}</Styled.Description>
        </Styled.TextSection>
        <Styled.StatsSection
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <Styled.StatNumber>142</Styled.StatNumber>
          <Styled.StatLabel>{t("explore.activeCheats")}</Styled.StatLabel>
        </Styled.StatsSection>
      </Styled.ContentWrapper>
    </Styled.HeroSection>
  );
};

