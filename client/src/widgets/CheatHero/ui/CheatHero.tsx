"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { useReducedMotion } from "@/shared/lib/hooks/useReducedMotion";
import { SearchBar } from "@/widgets/SearchBar";
import { CircularText } from "@/shared/ui/CircularText";
import { getCheat, cheatKeys } from "@/entities/cheat";
import { buttonAnimations } from "../lib/animConstants";
import * as Styled from "./styled";

export interface CheatHeroProps {
  gameId: string;
  cheatId: string;
  onBuyNowClick?: () => void;
}

export function CheatHero({ gameId, cheatId, onBuyNowClick }: CheatHeroProps) {
  const prefersReducedMotion = useReducedMotion();

  const { data: cheat, isLoading } = useQuery({
    queryKey: cheatKeys.detail(cheatId),
    queryFn: () => getCheat(cheatId),
  });

  if (isLoading || !cheat) {
    return null;
  }

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
    hidden: prefersReducedMotion
      ? { opacity: 0 }
      : { opacity: 0, scale: 0.9, rotate: -5 },
    visible: {
      opacity: 1,
      scale: prefersReducedMotion ? 1 : 1,
      rotate: prefersReducedMotion ? 0 : 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.8,
        delay: prefersReducedMotion ? 0 : 0.2,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const buttonVariants = prefersReducedMotion
    ? buttonAnimations.reducedMotion
    : {
        hidden: buttonAnimations.initial,
        visible: buttonAnimations.animate,
      };

  return (
    <Styled.Container>
      <Styled.LeftSection
        as={motion.div}
        variants={textVariants}
        initial="hidden"
        animate="visible"
      >
        <Styled.SearchBarWrapper>
          <SearchBar />
        </Styled.SearchBarWrapper>
        <Styled.BrandName>{cheat.brandName}</Styled.BrandName>
        <Styled.Title>{cheat.title}</Styled.Title>
        <Styled.Description>{cheat.description}</Styled.Description>
        <Styled.ButtonGroup
          as={motion.div}
          variants={buttonVariants}
          initial="hidden"
          animate="visible"
        >
          <Styled.PrimaryButton
            as={motion.button}
            onClick={onBuyNowClick}
            whileHover={
              prefersReducedMotion
                ? buttonAnimations.reducedMotion.hover
                : buttonAnimations.hover
            }
            whileTap={
              prefersReducedMotion
                ? buttonAnimations.reducedMotion.tap
                : buttonAnimations.tap
            }
          >
            Купить сейчас
          </Styled.PrimaryButton>
          <Styled.SecondaryButton
            as={motion.button}
            whileHover={
              prefersReducedMotion
                ? buttonAnimations.reducedMotion.hover
                : buttonAnimations.hover
            }
            whileTap={
              prefersReducedMotion
                ? buttonAnimations.reducedMotion.tap
                : buttonAnimations.tap
            }
          >
            Статусы читов
          </Styled.SecondaryButton>
        </Styled.ButtonGroup>
        <Styled.TelegramText>
          Подписывайтесь на <Styled.TelegramLink>Telegram</Styled.TelegramLink>{" "}
          это важно потому что все статусы и новости о читах именно там
        </Styled.TelegramText>
      </Styled.LeftSection>

      <Styled.RightSection
        as={motion.div}
        variants={imageVariants}
        initial="hidden"
        animate="visible"
      >
        <Styled.CircularWrapper>
          {cheat.circularImage && (
            <Styled.CircularImage>
              <Image
                src={cheat.circularImage}
                alt={cheat.brandName}
                width={300}
                height={300}
                unoptimized
              />
            </Styled.CircularImage>
          )}
          <CircularText
            text="приватные читы на сайте cheatarena.com "
            radius={200}
            fontSize={12}
            mobileFontSize={8}
            fontWeight={700}
            letterSpacing={2}
          />
          <CircularText
            text="помните покупая чит вы сами сделали выбор встать на сторону зла"
            radius={170}
            fontSize={8}
            mobileFontSize={6}
            mobileRadius={119}
            fontWeight={600}
            letterSpacing={1}
          />
          <Styled.GlowEffect />
        </Styled.CircularWrapper>
      </Styled.RightSection>
    </Styled.Container>
  );
}
