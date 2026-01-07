"use client";

import React from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/shared/lib/hooks/useReducedMotion";
import { COOKIE_TRANSLATIONS, getContainerVariants, getCookieSectionVariants, COOKIE_SECTIONS } from "../lib/constants";
import { CookiesInfoProps } from "../model/types";
import * as Styled from "./styled";

export function CookiesInfo({ className }: CookiesInfoProps) {
  const prefersReducedMotion = useReducedMotion();

  const containerVariants = getContainerVariants(prefersReducedMotion);
  const sectionVariants = getCookieSectionVariants(prefersReducedMotion);

  const handleAcceptAll = () => {
    // TODO: Implement cookie acceptance logic
    console.log("Accept all cookies");
  };

  const handleRejectNonEssential = () => {
    // TODO: Implement cookie rejection logic
    console.log("Reject non-essential cookies");
  };

  const handleManageCookies = () => {
    // TODO: Implement cookie management modal/panel
    console.log("Open cookie management");
  };

  const getSectionIcon = (section: string) => {
    switch (section) {
      case "essential":
        return "🔒";
      case "analytics":
        return "📊";
      case "marketing":
        return "🎯";
      case "preferences":
        return "⚙️";
      default:
        return "🍪";
    }
  };

  return (
    <Styled.Container
      className={className}
      as={motion.div}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      <Styled.CookieIcon>🍪</Styled.CookieIcon>

      <Styled.Header as={motion.div} variants={sectionVariants}>
        <Styled.Title>{COOKIE_TRANSLATIONS.title}</Styled.Title>
        <Styled.Description>{COOKIE_TRANSLATIONS.description}</Styled.Description>
      </Styled.Header>

      <Styled.CookieSections>
        {COOKIE_SECTIONS.map((section) => {
          const sectionData = COOKIE_TRANSLATIONS[section];
          return (
            <Styled.CookieSection
              key={section}
              as={motion.div}
              variants={sectionVariants}
            >
              <Styled.SectionIcon>
                {getSectionIcon(section)}
              </Styled.SectionIcon>
              <Styled.SectionContent>
                <Styled.SectionTitle>{sectionData.title}</Styled.SectionTitle>
                <Styled.SectionDescription>
                  {sectionData.description}
                </Styled.SectionDescription>
              </Styled.SectionContent>
            </Styled.CookieSection>
          );
        })}
      </Styled.CookieSections>

      <Styled.Actions as={motion.div} variants={sectionVariants}>
        <Styled.ActionButton variant="secondary" onClick={handleManageCookies}>
          {COOKIE_TRANSLATIONS.manage}
        </Styled.ActionButton>
        <Styled.ActionButton variant="secondary" onClick={handleRejectNonEssential}>
          {COOKIE_TRANSLATIONS.reject}
        </Styled.ActionButton>
        <Styled.ActionButton variant="primary" onClick={handleAcceptAll}>
          {COOKIE_TRANSLATIONS.accept}
        </Styled.ActionButton>
      </Styled.Actions>
    </Styled.Container>
  );
}
