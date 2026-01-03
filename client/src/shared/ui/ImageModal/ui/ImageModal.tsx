"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useReducedMotion } from "@/shared/lib/hooks/useReducedMotion";
import { imageModalAnimations } from "../lib/animConstants";
import * as Styled from "./styled";

interface ImageModalProps {
  isOpen: boolean;
  imageSrc: string;
  imageAlt: string;
  onClose: () => void;
}

export function ImageModal({
  isOpen,
  imageSrc,
  imageAlt,
  onClose,
}: ImageModalProps) {
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const backdropVariants = imageModalAnimations.backdrop(prefersReducedMotion);
  const imageVariants = imageModalAnimations.image(prefersReducedMotion);
  const closeButtonVariants =
    imageModalAnimations.closeButton(prefersReducedMotion);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <Styled.Backdrop
            as={motion.div}
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={handleBackdropClick}
          >
            <Styled.ImageWrapper
              as={motion.div}
              variants={imageVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                sizes="90vw"
                style={{
                  objectFit: "contain",
                }}
                priority
              />
            </Styled.ImageWrapper>
          </Styled.Backdrop>

          <Styled.CloseButton
            as={motion.button}
            variants={closeButtonVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            whileHover={
              prefersReducedMotion
                ? {}
                : imageModalAnimations.closeButton(prefersReducedMotion).hover
            }
            whileTap={
              prefersReducedMotion
                ? {}
                : imageModalAnimations.closeButton(prefersReducedMotion).tap
            }
            aria-label="Close modal"
          >
            ×
          </Styled.CloseButton>
        </>
      )}
    </AnimatePresence>
  );
}

