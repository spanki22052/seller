"use client";

import React, { useCallback, useRef } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { motion, useMotionValue } from "framer-motion";
import { useReducedMotion } from "@/shared/lib/hooks/useReducedMotion";
import { useViewportWidth } from "@/shared/lib/hooks/useViewportWidth";
import skeletonLeftTopImage from "@/shared/assets/images/skeleton-left-top.png";
import * as Styled from "./styled";

const NeonCircles = dynamic(() => import("@/shared/ui/NeonCircles").then((mod) => ({ default: mod.NeonCircles })), {
  ssr: false,
});

export function BeforeBuyInfo() {
  const prefersReducedMotion = useReducedMotion();
  const { isBelowBreakpoint } = useViewportWidth(1024);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const textMouseX = useMotionValue(0);
  const textMouseY = useMotionValue(0);

  const rafIdRef = useRef<number | null>(null);
  const textRafIdRef = useRef<number | null>(null);
  const lastValuesRef = useRef({ x: 0, y: 0 });
  const lastTextValuesRef = useRef({ x: 0, y: 0 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (prefersReducedMotion) return;

      // Throttle with requestAnimationFrame
      if (rafIdRef.current === null) {
        rafIdRef.current = requestAnimationFrame(() => {
          const rect = e.currentTarget.getBoundingClientRect();
          const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
          const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

          // Only update if change is significant
          if (
            Math.abs(x - lastValuesRef.current.x) > 0.01 ||
            Math.abs(y - lastValuesRef.current.y) > 0.01
          ) {
            mouseX.set(x);
            mouseY.set(y);
            lastValuesRef.current = { x, y };
          }

          rafIdRef.current = null;
        });
      }
    },
    [mouseX, mouseY, prefersReducedMotion]
  );

  const handleMouseLeave = useCallback(() => {
    if (rafIdRef.current !== null) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }
    mouseX.set(0);
    mouseY.set(0);
    lastValuesRef.current = { x: 0, y: 0 };
  }, [mouseX, mouseY]);

  const handleTextMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (prefersReducedMotion || !isBelowBreakpoint) return;

      // Throttle with requestAnimationFrame
      if (textRafIdRef.current === null) {
        textRafIdRef.current = requestAnimationFrame(() => {
          const rect = e.currentTarget.getBoundingClientRect();
          const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
          const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

          // Only update if change is significant
          if (
            Math.abs(x - lastTextValuesRef.current.x) > 0.01 ||
            Math.abs(y - lastTextValuesRef.current.y) > 0.01
          ) {
            textMouseX.set(x);
            textMouseY.set(y);
            lastTextValuesRef.current = { x, y };
          }

          textRafIdRef.current = null;
        });
      }
    },
    [textMouseX, textMouseY, prefersReducedMotion, isBelowBreakpoint]
  );

  const handleTextMouseLeave = useCallback(() => {
    if (textRafIdRef.current !== null) {
      cancelAnimationFrame(textRafIdRef.current);
      textRafIdRef.current = null;
    }
    textMouseX.set(0);
    textMouseY.set(0);
    lastTextValuesRef.current = { x: 0, y: 0 };
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
