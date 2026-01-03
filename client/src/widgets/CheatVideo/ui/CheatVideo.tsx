"use client";

import React from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/shared/lib/hooks/useReducedMotion";
import * as Styled from "./styled";

export function CheatVideo() {
  const prefersReducedMotion = useReducedMotion();

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

  const imageVariants = {
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
          variants={imageVariants}
          initial="hidden"
          animate="visible"
        >
          <Styled.VideoThumbnail>
            <Styled.PlayButton
              as={motion.div}
              whileHover={prefersReducedMotion ? {} : { scale: 1.1 }}
              whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
            >
              ▶
            </Styled.PlayButton>
          </Styled.VideoThumbnail>
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
