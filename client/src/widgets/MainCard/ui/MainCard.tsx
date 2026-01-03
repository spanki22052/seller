"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { SkeletonIcon } from "@/shared/assets/icons";
import { useReducedMotion } from "@/shared/lib/hooks/useReducedMotion";
import cheatarenaLogo from "@/shared/assets/images/cheatarena.png";
import { SearchBar } from "@/widgets/SearchBar";
import * as Styled from "./styled";

export function MainCard() {
  const prefersReducedMotion = useReducedMotion();

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
      <SearchBar />
      <Styled.ContentWrapper>
        <Styled.LogoTopRight>
          <Image
            src={cheatarenaLogo}
            alt="CHEATARENA"
            width={154}
            height={26}
            priority
          />
        </Styled.LogoTopRight>
        <Styled.TextSection
          as={motion.div}
          variants={textVariants}
          initial="hidden"
          animate="visible"
        >
          <Styled.Title>
            <Image
              src="/images/cheats.png"
              alt="Приватные читы"
              width={400}
              height={120}
              priority
            />
          </Styled.Title>
          <Styled.Description>
            Сейчас на сайте нет контента который вы ищите. Мы работаем на
            решением проблем. Поздравляем всех с новым годом. Надеемся в скором
            времени решить все юридические вопросы. Оставайтесь с нами!
          </Styled.Description>
          <Styled.ButtonGroup>
            <Styled.PrimaryButton type="primary" size="large">
              Тех поддержка
            </Styled.PrimaryButton>
            <Styled.SecondaryButton size="large">
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
