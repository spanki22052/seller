"use client";

import React from "react";
import { motion, MotionValue, useTransform } from "framer-motion";
import * as Styled from "./styled";

interface GradientSmokeProps {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  prefersReducedMotion: boolean;
}

export function GradientSmoke({
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
        }}
      >
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
          $position="center-left"
          animate={
            prefersReducedMotion
              ? {}
              : {
                  opacity: [0.35, 0.65, 0.35],
                  scale: [1, 1.1, 1],
                }
          }
          transition={{
            duration: 4.8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.8,
          }}
        />
        <Styled.SmokeLayer
          $position="center-right"
          animate={
            prefersReducedMotion
              ? {}
              : {
                  opacity: [0.45, 0.75, 0.45],
                  scale: [1, 1.13, 1],
                }
          }
          transition={{
            duration: 5.2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.2,
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
        <Styled.SmokeLayer
          $position="bottom-center"
          animate={
            prefersReducedMotion
              ? {}
              : {
                  opacity: [0.35, 0.65, 0.35],
                  scale: [1, 1.18, 1],
                }
          }
          transition={{
            duration: 5.8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.8,
          }}
        />
      </motion.div>
    </Styled.Container>
  );
}

