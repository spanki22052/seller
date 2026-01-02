"use client";

import React from "react";
import Image from "next/image";
import { motion, useTransform } from "framer-motion";
import { CrystalProps } from "../model/types";
import * as Styled from "./styled";

export function Crystal({
  crystal,
  mouseX,
  mouseY,
  prefersReducedMotion,
}: CrystalProps) {
  // Увеличиваем множитель параллакса для более заметного эффекта
  const parallaxMultiplier = 1.5;
  const x = useTransform(
    mouseX,
    (value) => value * crystal.parallaxX * parallaxMultiplier
  );
  const y = useTransform(
    mouseY,
    (value) => value * crystal.parallaxY * parallaxMultiplier
  );

  // Добавляем небольшое масштабирование при наведении для глубины
  const scale = useTransform([mouseX, mouseY], ([x, y]: number[]) => {
    // Вычисляем расстояние от центра (0, 0) для более естественного эффекта
    const distance = Math.sqrt(x * x + y * y);
    return 1 + distance * 0.03; // Максимальное увеличение ~3-4%
  });

  if (prefersReducedMotion) {
    return (
      <Styled.CrystalWrapper
        style={{
          left: `${crystal.x}%`,
          top: `${crystal.y}%`,
          width: `${crystal.size}px`,
          height: `${crystal.size}px`,
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            transform: `rotate(${crystal.rotation}deg)`,
          }}
        >
          <Image
            src={crystal.image}
            alt="Crystal"
            width={crystal.size}
            height={crystal.size}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />
        </div>
      </Styled.CrystalWrapper>
    );
  }

  return (
    <Styled.CrystalWrapper
      style={{
        left: `${crystal.x}%`,
        top: `${crystal.y}%`,
        width: `${crystal.size}px`,
        height: `${crystal.size}px`,
      }}
    >
      <motion.div
        style={{
          width: "100%",
          height: "100%",
          rotate: crystal.rotation,
          x,
          y,
          scale,
        }}
      >
        <Image
          src={crystal.image}
          alt="Crystal"
          width={crystal.size}
          height={crystal.size}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
          }}
        />
      </motion.div>
    </Styled.CrystalWrapper>
  );
}
