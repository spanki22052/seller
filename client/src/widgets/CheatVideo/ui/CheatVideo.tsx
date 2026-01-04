"use client";

import React from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { useReducedMotion } from "@/shared/lib/hooks/useReducedMotion";
import { VideoPlayer } from "@/shared/ui/VideoPlayer";
import { getSettings, settingsKeys } from "@/entities/settings";
import * as Styled from "./styled";

export interface CheatVideoProps {
  cheatId: string;
}

export function CheatVideo({ cheatId }: CheatVideoProps) {
  const prefersReducedMotion = useReducedMotion();

  const { data: settings, isLoading } = useQuery({
    queryKey: settingsKeys.detail(),
    queryFn: () => getSettings(),
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.1,
        delayChildren: prefersReducedMotion ? 0 : 0.2,
      },
    },
  };

  const textVariants = {
    hidden: prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: prefersReducedMotion ? 0 : 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const videoVariants = {
    hidden: prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: prefersReducedMotion ? 0 : 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.6,
        delay: prefersReducedMotion ? 0 : 0.3,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  if (isLoading) {
    return (
      <Styled.Container>
        <Styled.Title>Видео как купить и скачать</Styled.Title>
        <Styled.ContentWrapper>
          <Styled.LoadingPlaceholder />
        </Styled.ContentWrapper>
      </Styled.Container>
    );
  }

  if (!settings?.howToBuyVideoUrl) {
    return null;
  }

  return (
    <Styled.Container>
      <Styled.Title>Видео как купить и скачать</Styled.Title>
      <Styled.ContentWrapper
        as={motion.div}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Styled.LeftSection
          as={motion.div}
          variants={videoVariants}
          initial="hidden"
          animate="visible"
        >
          <VideoPlayer
            src={settings.howToBuyVideoUrl}
            poster={settings.howToBuyVideoThumbnail}
            title="Видео инструкция по покупке"
            controls={true}
            autoplay={false}
          />
        </Styled.LeftSection>

        <Styled.RightSection
          as={motion.div}
          variants={textVariants}
          initial="hidden"
          animate="visible"
        >
          <Styled.QuestionTitle>Как купить?</Styled.QuestionTitle>
          <Styled.Description>
            Настоятельно рекомендуем для новичков, перед покупкой посмотреть
            видео инструкцию по приобретению любого софта. Многие, нас
            спрашивают как купить, куда нажать. Именно по этому, просмотр видео
            снизит нагрузку на тех поддержку и даст возможность сосредоточится
            на более важных аспектах и задачах.
          </Styled.Description>
        </Styled.RightSection>
      </Styled.ContentWrapper>
    </Styled.Container>
  );
}
