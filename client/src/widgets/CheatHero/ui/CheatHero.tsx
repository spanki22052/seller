"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { useReducedMotion } from "@/shared/lib/hooks/useReducedMotion";
import { ImageModal } from "@/shared/ui/ImageModal";
import { VideoPlayer } from "@/shared/ui/VideoPlayer";
import { getCheat, cheatKeys } from "@/entities/cheat";
import { CheatPurchaseSelector } from "@/widgets/CheatPurchaseSelector";
import * as Styled from "./styled";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

function VideoModal({ isOpen, onClose, children }: VideoModalProps) {
  if (!isOpen) return null;

  return (
    <Styled.VideoModalOverlay onClick={onClose}>
      <Styled.VideoModalContent onClick={(e) => e.stopPropagation()}>
        <Styled.VideoModalClose onClick={onClose}>×</Styled.VideoModalClose>
        {children}
      </Styled.VideoModalContent>
    </Styled.VideoModalOverlay>
  );
}

export interface CheatHeroProps {
  cheatId: string;
}

export function CheatHero({ cheatId }: CheatHeroProps) {
  const prefersReducedMotion = useReducedMotion();
  const [selectedImage, setSelectedImage] = useState<{
    src: string;
    alt: string;
  } | null>(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const { data: cheat, isLoading: isCheatLoading } = useQuery({
    queryKey: cheatKeys.detail(cheatId),
    queryFn: () => getCheat(cheatId),
  });

  if (isCheatLoading || !cheat) {
    return null;
  }

  const handleScreenshotClick = (image: string, alt: string) => {
    setSelectedImage({ src: image, alt });
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  const handleVideoClick = () => {
    setIsVideoModalOpen(true);
  };

  const handleCloseVideoModal = () => {
    setIsVideoModalOpen(false);
  };

  const textVariants = {
    hidden: prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: prefersReducedMotion ? 0 : 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const imageVariants = {
    hidden: prefersReducedMotion
      ? { opacity: 0 }
      : { opacity: 0, scale: 0.9, rotate: -5 },
    visible: {
      opacity: 1,
      scale: prefersReducedMotion ? 1 : 1,
      rotate: prefersReducedMotion ? 0 : 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.8,
        delay: prefersReducedMotion ? 0 : 0.2,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <Styled.Container>
      <Styled.LeftSection
        as={motion.div}
        variants={textVariants}
        initial="hidden"
        animate="visible"
      >
        <Styled.Title>{cheat.brandName}</Styled.Title>
        <Styled.Description>{cheat.description}</Styled.Description>

        {cheat.screenshots && cheat.screenshots.length > 0 && (
          <Styled.ScreenshotsGrid
            as={motion.div}
            variants={textVariants}
            initial="hidden"
            animate="visible"
          >
            {cheat.videoUrl && (
              <Styled.VideoWrapper
                key="video"
                as={motion.div}
                whileHover={
                  prefersReducedMotion ? {} : { scale: 1.05, zIndex: 10 }
                }
                whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
                onClick={handleVideoClick}
              >
                <Styled.VideoContainer>
                  <Styled.VideoIcon>
                    <Styled.PlayIcon>▶</Styled.PlayIcon>
                  </Styled.VideoIcon>
                  <Styled.VideoWatermark>ВИДЕО</Styled.VideoWatermark>
                </Styled.VideoContainer>
              </Styled.VideoWrapper>
            )}
            {cheat.screenshots?.slice(0, 3).map((screenshot, index) => (
              <Styled.ScreenshotWrapper
                key={index}
                as={motion.div}
                whileHover={
                  prefersReducedMotion ? {} : { scale: 1.05, zIndex: 10 }
                }
                whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
                onClick={() =>
                  handleScreenshotClick(screenshot, `Screenshot ${index + 1}`)
                }
              >
                <Styled.ImageContainer>
                  <img
                    src={screenshot}
                    alt={`Screenshot ${index + 1}`}
                    onContextMenu={(e) => e.preventDefault()}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                  <Styled.Watermark>CHITARENA</Styled.Watermark>
                </Styled.ImageContainer>
              </Styled.ScreenshotWrapper>
            ))}
          </Styled.ScreenshotsGrid>
        )}
      </Styled.LeftSection>

      <Styled.RightSection
        as={motion.div}
        variants={imageVariants}
        initial="hidden"
        animate="visible"
      >
        <CheatPurchaseSelector cheatId={cheatId} />
      </Styled.RightSection>

      <ImageModal
        isOpen={!!selectedImage}
        imageSrc={selectedImage?.src || ""}
        imageAlt={selectedImage?.alt || ""}
        onClose={handleCloseModal}
      />

      <VideoModal isOpen={isVideoModalOpen} onClose={handleCloseVideoModal}>
        <VideoPlayer
          src={cheat.videoUrl || ""}
          title="Видео инструкция"
          controls={true}
          autoplay={false}
        />
      </VideoModal>
    </Styled.Container>
  );
}
