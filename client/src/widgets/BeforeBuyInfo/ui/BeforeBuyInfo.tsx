"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/shared/lib/hooks/useReducedMotion";
import { useViewportWidth } from "@/shared/lib/hooks/useViewportWidth";
import skeletonLeftTopImage from "@/shared/assets/images/skeleton-left-top.png";
import * as Styled from "./styled";

export function BeforeBuyInfo() {
  const prefersReducedMotion = useReducedMotion();
  const { isBelowBreakpoint } = useViewportWidth(1024);

  const containerVariants = {
    hidden: prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: prefersReducedMotion ? 0 : 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const textVariants = {
    hidden: prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: prefersReducedMotion ? 0 : 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.7,
        delay: prefersReducedMotion ? 0 : 0.2,
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
        duration: prefersReducedMotion ? 0 : 0.7,
        delay: prefersReducedMotion ? 0 : 0.3,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <Styled.Container
      as={motion.div}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Styled.TextSection
        as={motion.div}
        variants={textVariants}
        initial="hidden"
        animate="visible"
      >
        <Styled.Title>Что нужно знать перед приобретением DLC?</Styled.Title>
        <Styled.Description>
          Давайте сразу поясню! Зачем основная масса игроков покупают DLC?!
          <br />
          <br />
          Заработать денег помогая другим достичь цели или пройти миссию,
          использовать конкретный DLC (Aim, Wallhack, Avto shot) чтобы
          &quot;понять дзен&quot; (попробовать что такое DLC), избежать
          постоянных проигрышей или просто получать удовольствие.
          <br />
          <br />
          Но помните приобретая DLC вы сами сделали выбор встать на сторону
          кайфа ;)
        </Styled.Description>
      </Styled.TextSection>

      {!isBelowBreakpoint && (
        <Styled.ImageSection
          as={motion.div}
          variants={imageVariants}
          initial="hidden"
          animate="visible"
        >
          <Styled.SkeletonImageWrapper>
            <Image
              src={skeletonLeftTopImage}
              alt="Skeleton"
              width={600}
              height={700}
              onContextMenu={(e) => e.preventDefault()}
              priority
            />
          </Styled.SkeletonImageWrapper>
        </Styled.ImageSection>
      )}
    </Styled.Container>
  );
}
