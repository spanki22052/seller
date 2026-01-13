"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { SkeletonIcon } from "@/shared/assets/icons";
import cheatarenaLogo from "@/shared/assets/images/cheatarena.png";
import { MainCardProps } from "../model/types";
import { MAIN_CARD_LINKS } from "../model/constants";
import { useMainCard } from "../hooks/useMainCard";
import * as Styled from "./styled";

export function MainCard({ links = MAIN_CARD_LINKS }: MainCardProps) {
  const {
    settings,
    handleSupportClick,
    handleAdminClick,
    textVariants,
    imageVariants,
  } = useMainCard(links);

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
