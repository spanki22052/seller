"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { useReducedMotion } from "@/shared/lib/hooks/useReducedMotion";
import { ImageModal } from "@/shared/ui/ImageModal";
import { getCheat, cheatKeys } from "@/entities/cheat";
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

  const { data: cheat, isLoading } = useQuery({
    queryKey: cheatKeys.detail(cheatId),
    queryFn: () => getCheat(cheatId),
  });

  if (isLoading || !cheat || !cheat.screenshots || cheat.screenshots.length === 0) {
    return null;
  }

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
        {cheat.screenshots.map((screenshot, index) => (
          <Styled.ScreenshotWrapper
            key={index}
            as={motion.div}
            variants={itemVariants}
            whileHover={prefersReducedMotion ? {} : { scale: 1.05, zIndex: 10 }}
            whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
            onClick={() =>
              handleScreenshotClick(screenshot, `Screenshot ${index + 1}`)
            }
          >
            <Styled.ImageContainer>
              <img
                src={screenshot}
                alt={`Screenshot ${index + 1}`}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
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
