"use client";

import React, { useCallback } from "react";
import Image from "next/image";
import { motion, useMotionValue } from "framer-motion";
import { useReducedMotion } from "@/shared/lib/hooks/useReducedMotion";
import { useViewportWidth } from "@/shared/lib/hooks/useViewportWidth";
import { NeonCircles } from "@/shared/ui/NeonCircles";
import skeletonLeftTopImage from "@/shared/assets/images/skeleton-left-top.png";
import * as Styled from "./styled";

export function BeforeBuyInfo() {
  const prefersReducedMotion = useReducedMotion();
  const { isBelowBreakpoint } = useViewportWidth(1024);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const textMouseX = useMotionValue(0);
  const textMouseY = useMotionValue(0);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (prefersReducedMotion) return;

      const rect = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

      mouseX.set(x);
      mouseY.set(y);
    },
    [mouseX, mouseY, prefersReducedMotion]
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  const handleTextMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (prefersReducedMotion || !isBelowBreakpoint) return;

      const rect = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

      textMouseX.set(x);
      textMouseY.set(y);
    },
    [textMouseX, textMouseY, prefersReducedMotion, isBelowBreakpoint]
  );

  const handleTextMouseLeave = useCallback(() => {
    textMouseX.set(0);
    textMouseY.set(0);
  }, [textMouseX, textMouseY]);

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
        onMouseMove={handleTextMouseMove}
        onMouseLeave={handleTextMouseLeave}
      >
        {isBelowBreakpoint && (
          <NeonCircles
            mouseX={textMouseX}
            mouseY={textMouseY}
            prefersReducedMotion={prefersReducedMotion}
          />
        )}
        <Styled.Title>Что нужно знать перед приобретением чита?</Styled.Title>
        <Styled.Description>
          Давайте сразу поясню! Зачем основная масса игроков покупают чит?!
          <br />
          <br />
          Заработать денег помогая другим достичь цели или пройти миссию,
          использовать конкретный чит (Aim, Wallhack, Avto shot) чтобы
          &quot;понять дзен&quot; (попробовать что такое чит), избежать
          постоянных проигрышей или просто получать удовольствие.
          <br />
          <br />
          Но помните приобретая чит вы сами сделали выбор встать на сторону
          кайфа ;)
        </Styled.Description>
      </Styled.TextSection>

      {!isBelowBreakpoint && (
        <Styled.ImageSection
          as={motion.div}
          variants={imageVariants}
          initial="hidden"
          animate="visible"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <NeonCircles
            mouseX={mouseX}
            mouseY={mouseY}
            prefersReducedMotion={prefersReducedMotion}
          />
          <Styled.SkeletonImageWrapper>
            <Image
              src={skeletonLeftTopImage}
              alt="Skeleton"
              width={600}
              height={700}
              priority
            />
          </Styled.SkeletonImageWrapper>
        </Styled.ImageSection>
      )}
    </Styled.Container>
  );
}
