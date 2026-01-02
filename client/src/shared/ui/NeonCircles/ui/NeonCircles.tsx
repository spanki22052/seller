"use client";

import React from "react";
import { motion, MotionValue, useTransform } from "framer-motion";
import * as Styled from "./styled";

interface NeonCirclesProps {
  mouseX?: MotionValue<number>;
  mouseY?: MotionValue<number>;
  prefersReducedMotion: boolean;
}

interface Circle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  delay: number;
  duration: number;
  blur: number;
}

const circles: Circle[] = [
  {
    id: 1,
    x: 20,
    y: 15,
    size: 120,
    color: "#8b5cf6",
    delay: 0,
    duration: 4,
    blur: 40,
  },
  {
    id: 2,
    x: 80,
    y: 25,
    size: 80,
    color: "#3b82f6",
    delay: 0.5,
    duration: 5,
    blur: 30,
  },
  {
    id: 3,
    x: 50,
    y: 60,
    size: 150,
    color: "#ec4899",
    delay: 1,
    duration: 6,
    blur: 50,
  },
  {
    id: 4,
    x: 15,
    y: 70,
    size: 100,
    color: "#a78bfa",
    delay: 0.3,
    duration: 4.5,
    blur: 35,
  },
  {
    id: 5,
    x: 85,
    y: 75,
    size: 90,
    color: "#60a5fa",
    delay: 0.7,
    duration: 5.5,
    blur: 32,
  },
  {
    id: 6,
    x: 40,
    y: 40,
    size: 70,
    color: "#8b5cf6",
    delay: 0.2,
    duration: 3.5,
    blur: 25,
  },
  {
    id: 7,
    x: 75,
    y: 50,
    size: 110,
    color: "#ec4899",
    delay: 0.8,
    duration: 4.8,
    blur: 38,
  },
];

export function NeonCircles({
  mouseX,
  mouseY,
  prefersReducedMotion,
}: NeonCirclesProps) {
  return (
    <Styled.Container>
      {circles.map((circle) => {
        const parallaxMultiplier = circle.size * 0.2 * (circle.id % 2 === 0 ? 1 : -1);
        const x = mouseX
          ? useTransform(
              mouseX,
              (value) => (prefersReducedMotion ? 0 : value * parallaxMultiplier)
            )
          : 0;
        const y = mouseY
          ? useTransform(
              mouseY,
              (value) => (prefersReducedMotion ? 0 : value * parallaxMultiplier)
            )
          : 0;

        return (
          <Styled.CircleWrapper
            key={circle.id}
            style={{
              left: `${circle.x}%`,
              top: `${circle.y}%`,
              width: circle.size,
              height: circle.size,
            }}
          >
            <motion.div
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                background: `radial-gradient(circle at 30% 30%, ${circle.color}88, ${circle.color}44, transparent)`,
                boxShadow: `
                  0 0 ${circle.blur}px ${circle.color}88,
                  0 0 ${circle.blur * 1.5}px ${circle.color}66,
                  0 0 ${circle.blur * 2}px ${circle.color}44,
                  inset 0 0 ${circle.size * 0.2}px rgba(255, 255, 255, 0.1)
                `,
                border: `2px solid ${circle.color}66`,
                filter: `blur(${circle.blur * 0.3}px)`,
                x,
                y,
              }}
              animate={
                prefersReducedMotion
                  ? {}
                  : {
                      scale: [1, 1.15, 1],
                      opacity: [0.5, 0.85, 0.5],
                      rotate: [0, 180, 360],
                    }
              }
              transition={{
                duration: circle.duration,
                repeat: Infinity,
                ease: [0.22, 1, 0.36, 1],
                delay: circle.delay,
              }}
            />
            <motion.div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: circle.size * 0.4,
                height: circle.size * 0.4,
                borderRadius: "50%",
                background: `radial-gradient(circle, ${circle.color}cc, transparent)`,
                transform: "translate(-50%, -50%)",
                boxShadow: `0 0 ${circle.blur * 0.5}px ${circle.color}aa`,
                filter: `blur(${circle.blur * 0.2}px)`,
              }}
              animate={
                prefersReducedMotion
                  ? {}
                  : {
                      scale: [1, 1.3, 1],
                      opacity: [0.7, 1, 0.7],
                    }
              }
              transition={{
                duration: circle.duration * 0.7,
                repeat: Infinity,
                ease: "easeInOut",
                delay: circle.delay,
              }}
            />
          </Styled.CircleWrapper>
        );
      })}
    </Styled.Container>
  );
}

