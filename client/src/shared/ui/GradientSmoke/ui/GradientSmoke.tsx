"use client";

import React, { memo } from "react";
import { motion, MotionValue, useTransform } from "framer-motion";
import * as Styled from "./styled";

interface GradientSmokeProps {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  prefersReducedMotion: boolean;
}

export const GradientSmoke = memo(function GradientSmoke({
  mouseX,
  mouseY,
  prefersReducedMotion,
}: GradientSmokeProps) {
  const smokeX = useTransform(
    mouseX,
    (value) => (prefersReducedMotion ? 0 : value * 30)
  );
  const smokeY = useTransform(
    mouseY,
    (value) => (prefersReducedMotion ? 0 : value * 30)
  );

  return (
    <Styled.Container>
      <motion.div
        style={{
          x: smokeX,
          y: smokeY,
          willChange: "transform",
          transform: "translateZ(0)",
          backfaceVisibility: "hidden",
        }}
      >
        {/* Reduced from 9 to 5 layers for better performance */}
        <Styled.SmokeLayer
          $position="top-left"
          animate={
            prefersReducedMotion
              ? {}
              : {
                  opacity: [0.4, 0.7, 0.4],
                  scale: [1, 1.1, 1],
                }
          }
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <Styled.SmokeLayer
          $position="top-right"
          animate={
            prefersReducedMotion
              ? {}
              : {
                  opacity: [0.5, 0.8, 0.5],
                  scale: [1, 1.15, 1],
                }
          }
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        />
        <Styled.SmokeLayer
          $position="bottom-left"
          animate={
            prefersReducedMotion
              ? {}
              : {
                  opacity: [0.3, 0.6, 0.3],
                  scale: [1, 1.08, 1],
                }
          }
          transition={{
            duration: 4.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
        <Styled.SmokeLayer
          $position="bottom-right"
          animate={
            prefersReducedMotion
              ? {}
              : {
                  opacity: [0.4, 0.7, 0.4],
                  scale: [1, 1.12, 1],
                }
          }
          transition={{
            duration: 5.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5,
          }}
        />
        <Styled.SmokeLayer
          $position="top-center"
          animate={
            prefersReducedMotion
              ? {}
              : {
                  opacity: [0.3, 0.6, 0.3],
                  scale: [1, 1.2, 1],
                }
          }
          transition={{
            duration: 4.2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.3,
          }}
        />
      </motion.div>
    </Styled.Container>
  );
});

