"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useReducedMotion } from "@/shared/lib/hooks/useReducedMotion";
import { useImageModalActions } from "@/shared/contexts/ImageModalContext";
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
  const { setIsImageModalOpen } = useImageModalActions();

  useEffect(() => {
    setIsImageModalOpen(isOpen);
  }, [isOpen, setIsImageModalOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);

    // Prevent body scroll and compensate for scrollbar width to prevent layout shift
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    const bodyPaddingRight = window.getComputedStyle(
      document.body
    ).paddingRight;
    const bodyPaddingRightNum = parseInt(bodyPaddingRight, 10) || 0;

    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${
      bodyPaddingRightNum + scrollbarWidth
    }px`;
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
      document.documentElement.style.overflow = "";
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
              <img
                src={imageSrc}
                alt={imageAlt}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                }}
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
