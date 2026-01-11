"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { SkeletonIcon } from "@/shared/assets/icons";
import { useReducedMotion } from "@/shared/lib/hooks/useReducedMotion";
import cheatarenaLogo from "@/shared/assets/images/cheatarena.png";
import { useSettings } from "@/entities/settings";
import { MainCardProps } from "../model/types";
import { MAIN_CARD_LINKS } from "../model/constants";
import * as Styled from "./styled";

export function MainCard({ links = MAIN_CARD_LINKS }: MainCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const { data: settings } = useSettings();

  // Get support links from settings, fallback to default links
  const supportLinks = settings?.supportLinks || [];
  const techSupportLink =
    supportLinks.find(
      (link: { label: string; href: string }) =>
        link.label === "Техническая поддержка"
    )?.href || links.supportUrl;
  const adminLink =
    supportLinks.find(
      (link: { label: string; href: string }) =>
        link.label === "Связь с администратором"
    )?.href || links.adminUrl;

  const handleSupportClick = () => {
    window.open(techSupportLink, "_blank", "noopener,noreferrer");
  };

  const handleAdminClick = () => {
    window.open(adminLink, "_blank", "noopener,noreferrer");
  };

  const textVariants = {
    hidden: prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: prefersReducedMotion ? 0 : 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const imageVariants = {
    hidden: prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: prefersReducedMotion ? 0 : 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.6,
        delay: prefersReducedMotion ? 0 : 0.2,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <Styled.Container>
      <Styled.ContentWrapper>
        <Styled.LogoTopRight>
          <Image
            src={cheatarenaLogo}
            alt="CHEATARENA"
            width={154}
            height={26}
            priority
            onContextMenu={(e) => e.preventDefault()}
          />
        </Styled.LogoTopRight>
        <Styled.TextSection
          as={motion.div}
          variants={textVariants}
          initial="hidden"
          animate="visible"
        >
          <Styled.Title>
            {settings?.mainPageTitle || (
              <Image
                src="/images/cheats.png"
                alt="Приватные DLC"
                width={400}
                height={120}
                priority
                onContextMenu={(e) => e.preventDefault()}
              />
            )}
          </Styled.Title>
          <Styled.Description>
            {settings?.mainPageDescription ||
              "Сейчас на сайте нет контента который вы ищите. Мы работаем на решением проблем. Поздравляем всех с новым годом. Надеемся в скором времени решить все юридические вопросы. Оставайтесь с нами!"}
          </Styled.Description>
          <Styled.ButtonGroup>
            <Styled.PrimaryButton
              type="primary"
              size="large"
              onClick={handleSupportClick}
            >
              Тех поддержка
            </Styled.PrimaryButton>
            <Styled.SecondaryButton size="large" onClick={handleAdminClick}>
              Связь с админом
            </Styled.SecondaryButton>
          </Styled.ButtonGroup>
        </Styled.TextSection>
        <Styled.ImageSection
          as={motion.div}
          variants={imageVariants}
          initial="hidden"
          animate="visible"
        >
          <Styled.SkeletonWrapper>
            <SkeletonIcon />
          </Styled.SkeletonWrapper>
        </Styled.ImageSection>
      </Styled.ContentWrapper>
    </Styled.Container>
  );
}
