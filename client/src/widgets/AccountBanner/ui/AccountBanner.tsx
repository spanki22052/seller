"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useReducedMotion } from "@/shared/lib/hooks/useReducedMotion";
import skeletonImage from "@/shared/assets/images/skeleton-looking.png";
import {
  platforms,
  generateNeonBlinks,
  NEON_BLINK_COUNT,
  RED_LINES_IMAGE,
  SPRING_CONFIG,
} from "../lib/constants";
import { NeonBlink } from "./NeonBlink";
import * as Styled from "./styled";

export function AccountBanner() {
  const prefersReducedMotion = useReducedMotion();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothMouseX = useSpring(mouseX, SPRING_CONFIG);
  const smoothMouseY = useSpring(mouseY, SPRING_CONFIG);

  const [neonBlinks, setNeonBlinks] = useState<
    ReturnType<typeof generateNeonBlinks>
  >([]);

  useEffect(() => {
    setNeonBlinks(generateNeonBlinks(NEON_BLINK_COUNT));
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (prefersReducedMotion) return;

      const rect = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2; // от -1 до 1
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2; // от -1 до 1

      mouseX.set(x);
      mouseY.set(y);
    },
    [mouseX, mouseY, prefersReducedMotion]
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

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

  const imageVariants = {
    hidden: prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: 20 },
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

  return (
    <Styled.Container
      as={motion.div}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <Styled.NeonBlinkContainer>
        {neonBlinks.map((blink) => (
          <NeonBlink
            key={blink.id}
            blink={blink}
            prefersReducedMotion={prefersReducedMotion}
          />
        ))}
      </Styled.NeonBlinkContainer>
      <Styled.LeftSection>
        <Styled.RedLinesWrapper>
          <Image
            src={RED_LINES_IMAGE}
            alt="Red lines"
            width={800}
            height={600}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </Styled.RedLinesWrapper>
        <Styled.LogosContainer>
          {platforms.map((platform) => (
            <Styled.LogoWrapper key={platform.id}>
              <Image
                src={platform.image}
                alt={platform.name}
                width={60}
                height={60}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                }}
              />
            </Styled.LogoWrapper>
          ))}
        </Styled.LogosContainer>
        <Styled.TextContent>
          <Styled.MainText>
            Очень большой выбор аккаунтов
            <br />
            Steam, Epic Games, Origin, Uplay.
          </Styled.MainText>
          <Styled.SecondaryText>
            У нас частые пополнения и низкие цены.
          </Styled.SecondaryText>
        </Styled.TextContent>
        <Styled.ButtonWrapper>
          <Styled.StoreButton type="primary" size="large">
            В магазин
          </Styled.StoreButton>
          <Styled.BottomText>
            Обязательно заглядывайте в наш магазин почаще!
          </Styled.BottomText>
        </Styled.ButtonWrapper>
      </Styled.LeftSection>
      <Styled.RightSection
        as={motion.div}
        variants={imageVariants}
        initial="hidden"
        animate="visible"
      >
        <Styled.SkeletonImageWrapper>
          <Image src={skeletonImage} alt="Skeleton" priority />
        </Styled.SkeletonImageWrapper>
      </Styled.RightSection>
    </Styled.Container>
  );
}
