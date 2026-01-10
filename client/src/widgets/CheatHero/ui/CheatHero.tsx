"use client";

import React from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { useReducedMotion } from "@/shared/lib/hooks/useReducedMotion";
import { SearchBar } from "@/widgets/SearchBar";
import { getCheat, cheatKeys } from "@/entities/cheat";
import { CheatPurchaseSelector } from "@/widgets/CheatPurchaseSelector";
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
        {cheat.circularImage && (
          <Styled.CheatAvatar>
            <Styled.CheatAvatarGlow />
            <img
              src={cheat.circularImage}
              alt={`${cheat.brandName} avatar`}
              style={{
                borderRadius: "50%",
                objectFit: "cover",
                width: "100%",
                height: "100%",
              }}
            />
          </Styled.CheatAvatar>
        )}
        <Styled.Title>{cheat.brandName}</Styled.Title>
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
            Статусы DLC
          </Styled.SecondaryButton>
        </Styled.ButtonGroup>
        <Styled.TelegramText>
          Подписывайтесь на <Styled.TelegramLink>Telegram</Styled.TelegramLink>{" "}
          это важно потому что все статусы и новости о DLC именно там
        </Styled.TelegramText>
      </Styled.LeftSection>

      <Styled.RightSection
        as={motion.div}
        variants={imageVariants}
        initial="hidden"
        animate="visible"
      >
        <CheatPurchaseSelector cheatId={cheatId} />
      </Styled.RightSection>
    </Styled.Container>
  );
}
