"use client";

import React, { useCallback } from "react";
import Image from "next/image";
import { motion, useMotionValue } from "framer-motion";
import { useReducedMotion } from "@/shared/lib/hooks/useReducedMotion";
import skeletonRightTopImage from "@/shared/assets/images/skeleton-right-top.png";
import infoImage from "@/shared/assets/images/info-img.png";
import { generateNeonBlinks, NEON_BLINK_COUNT } from "../lib/constants";
import { NeonBlink } from "./NeonBlink";
import * as Styled from "./styled";

export function InfoBanner() {
  const prefersReducedMotion = useReducedMotion();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const neonBlinks = generateNeonBlinks(NEON_BLINK_COUNT);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2; // от -1 до 1
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2; // от -1 до 1

    mouseX.set(x);
    mouseY.set(y);
  };

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

  const leftImageVariants = {
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
      <Styled.LeftSection
        as={motion.div}
        variants={leftImageVariants}
        initial="hidden"
        animate="visible"
      >
        <Styled.SkeletonImageWrapper>
          <Image src={skeletonRightTopImage} alt="Skeleton" priority />
        </Styled.SkeletonImageWrapper>
      </Styled.LeftSection>

      <Styled.InfoImageWrapper>
        <Image src={infoImage} alt="Info" width={500} height={600} priority />
      </Styled.InfoImageWrapper>
    </Styled.Container>
  );
}
