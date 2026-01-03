"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/shared/lib/hooks/useReducedMotion";
import { ImageModal } from "@/shared/ui/ImageModal";
import { screenshots } from "../lib/constants";
import * as Styled from "./styled";

interface CheatScreenshotsProps {
  cheatId: string;
}

export function CheatScreenshots({ cheatId }: CheatScreenshotsProps) {
  const prefersReducedMotion = useReducedMotion();
  const [selectedImage, setSelectedImage] = useState<{
    src: string;
    alt: string;
  } | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.1,
        delayChildren: prefersReducedMotion ? 0 : 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: prefersReducedMotion ? 1 : 1,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.4,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const handleScreenshotClick = (image: string, alt: string) => {
    setSelectedImage({ src: image, alt });
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <Styled.Container>
      <Styled.Title>Скриншоты</Styled.Title>
      <Styled.Grid
        as={motion.div}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {screenshots.map((screenshot) => (
          <Styled.ScreenshotWrapper
            key={screenshot.id}
            as={motion.div}
            variants={itemVariants}
            whileHover={prefersReducedMotion ? {} : { scale: 1.05, zIndex: 10 }}
            whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
            onClick={() =>
              handleScreenshotClick(screenshot.image, screenshot.alt)
            }
          >
            <Styled.ImageContainer>
              <Image
                src={screenshot.image}
                alt={screenshot.alt}
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                style={{ objectFit: "cover" }}
              />
              <Styled.Watermark>CHITARENA</Styled.Watermark>
            </Styled.ImageContainer>
          </Styled.ScreenshotWrapper>
        ))}
      </Styled.Grid>

      <ImageModal
        isOpen={!!selectedImage}
        imageSrc={selectedImage?.src || ""}
        imageAlt={selectedImage?.alt || ""}
        onClose={handleCloseModal}
      />
    </Styled.Container>
  );
}
