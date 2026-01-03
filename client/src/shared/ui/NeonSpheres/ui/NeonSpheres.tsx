"use client";

import React, { memo } from "react";
import { motion, MotionValue, useTransform } from "framer-motion";
import * as Styled from "./styled";

interface NeonSpheresProps {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  prefersReducedMotion: boolean;
}

interface Sphere {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  delay: number;
}

const spheres: Sphere[] = [
  { id: 1, x: 75, y: 20, size: 80, color: "#8b5cf6", delay: 0 },
  { id: 2, x: 85, y: 60, size: 60, color: "#3b82f6", delay: 0.2 },
  { id: 3, x: 70, y: 80, size: 100, color: "#ec4899", delay: 0.4 },
  { id: 4, x: 90, y: 40, size: 50, color: "#a78bfa", delay: 0.1 },
  { id: 5, x: 80, y: 70, size: 70, color: "#60a5fa", delay: 0.3 },
];

export const NeonSpheres = memo(function NeonSpheres({
  mouseX,
  mouseY,
  prefersReducedMotion,
}: NeonSpheresProps) {
  return (
    <Styled.Container>
      {spheres.map((sphere) => {
        const parallaxMultiplier = sphere.size * 0.3 * (sphere.id % 2 === 0 ? 1 : -1);
        const x = useTransform(
          mouseX,
          (value) => (prefersReducedMotion ? 0 : value * parallaxMultiplier)
        );
        const y = useTransform(
          mouseY,
          (value) => (prefersReducedMotion ? 0 : value * parallaxMultiplier)
        );

        return (
          <Styled.SphereWrapper
            key={sphere.id}
            style={{
              left: `${sphere.x}%`,
              top: `${sphere.y}%`,
              width: sphere.size,
              height: sphere.size,
            }}
          >
            <motion.div
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                background: `radial-gradient(circle at 30% 30%, ${sphere.color}88, ${sphere.color}44, transparent)`,
                boxShadow: `
                  0 0 ${sphere.size * 0.5}px ${sphere.color}66,
                  0 0 ${sphere.size * 0.8}px ${sphere.color}44,
                  inset 0 0 ${sphere.size * 0.3}px rgba(255, 255, 255, 0.1)
                `,
                border: `1px solid ${sphere.color}44`,
                x,
                y,
                willChange: "transform, opacity",
                transform: "translateZ(0)",
                backfaceVisibility: "hidden",
              }}
              animate={
                prefersReducedMotion
                  ? {}
                  : {
                      scale: [1, 1.1, 1],
                      opacity: [0.6, 0.9, 0.6],
                    }
              }
              transition={{
                duration: 3 + sphere.delay,
                repeat: Infinity,
                ease: "easeInOut",
                delay: sphere.delay,
              }}
            />
          </Styled.SphereWrapper>
        );
      })}
    </Styled.Container>
  );
});

