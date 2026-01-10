"use client";

import React from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/shared/lib/hooks/useReducedMotion";
import {
  COOKIE_TRANSLATIONS,
  getContainerVariants,
  getCookieSectionVariants,
  COOKIE_SECTIONS,
} from "../lib/constants";
import { CookiesInfoProps } from "../model/types";
import { useCookies } from "../hooks/useCookies";
import * as Styled from "./styled";

export function CookiesInfo({ className }: CookiesInfoProps) {
  const prefersReducedMotion = useReducedMotion();
  const { shouldShowWidget, acceptCookies, rejectCookies } = useCookies();

  const containerVariants = getContainerVariants(prefersReducedMotion);
  const sectionVariants = getCookieSectionVariants(prefersReducedMotion);

  const handleAcceptAll = () => {
    acceptCookies();
  };

  const handleRejectNonEssential = () => {
    rejectCookies();
  };

  // Не показывать виджет если куки уже были обработаны
  if (!shouldShowWidget) {
    return null;
  }

  return (
    <Styled.Container
      className={className}
      as={motion.div}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Styled.Header as={motion.div} variants={sectionVariants}>
        <Styled.Title>{COOKIE_TRANSLATIONS.title}</Styled.Title>
        <Styled.Description>
          {COOKIE_TRANSLATIONS.description}
        </Styled.Description>
      </Styled.Header>

      <Styled.Actions as={motion.div} variants={sectionVariants}>
        <Styled.ActionButton
          variant="secondary"
          onClick={handleRejectNonEssential}
        >
          {COOKIE_TRANSLATIONS.reject}
        </Styled.ActionButton>
        <Styled.ActionButton variant="primary" onClick={handleAcceptAll}>
          {COOKIE_TRANSLATIONS.accept}
        </Styled.ActionButton>
      </Styled.Actions>
    </Styled.Container>
  );
}
