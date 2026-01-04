"use client";

import React, { useCallback } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkBreaks from "remark-breaks";
import { useReducedMotion } from "@/shared/lib/hooks/useReducedMotion";
import { VideoPlayer } from "@/shared/ui/VideoPlayer";
import { getCheat, cheatKeys } from "@/entities/cheat";
import * as Styled from "./styled";

interface CheatDetailsProps {
  cheatId?: string;
  onBreadcrumbClick?: Record<string, () => void>;
}

export function CheatDetails({
  cheatId,
  onBreadcrumbClick,
}: CheatDetailsProps) {
  const prefersReducedMotion = useReducedMotion();

  const { data: cheat, isLoading } = useQuery({
    queryKey: cheatKeys.detail(cheatId || ""),
    queryFn: () => getCheat(cheatId!),
    enabled: !!cheatId,
  });

  /**
   * Handles breadcrumb click and scrolls to the corresponding section.
   * Falls back to href navigation if no scroll handler is provided.
   */
  const handleBreadcrumbClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, sectionId?: string) => {
      if (sectionId && onBreadcrumbClick?.[sectionId]) {
        e.preventDefault();
        onBreadcrumbClick[sectionId]();
      }
    },
    [onBreadcrumbClick]
  );

  if (isLoading || !cheat) {
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
    hidden: prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: prefersReducedMotion ? 0 : 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.4,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const videoVariants = {
    hidden: prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: prefersReducedMotion ? 1 : 1,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.5,
        delay: prefersReducedMotion ? 0 : 0.3,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <Styled.Container>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Styled.BreadcrumbsContainer as={motion.nav} variants={itemVariants}>
          {cheat.breadcrumbs.map((crumb, index) => (
            <React.Fragment key={index}>
              <Styled.BreadcrumbLink
                href={crumb.href || "#"}
                $isActive={index === cheat.breadcrumbs.length - 1}
                onClick={(e) => handleBreadcrumbClick(e, crumb.sectionId)}
              >
                {crumb.label}
              </Styled.BreadcrumbLink>
              {index < cheat.breadcrumbs.length - 1 && (
                <Styled.BreadcrumbArrow>→</Styled.BreadcrumbArrow>
              )}
            </React.Fragment>
          ))}
        </Styled.BreadcrumbsContainer>

        <Styled.BorderWrapper>
          {/* Multiple purple border layers with increasing distance and decreasing opacity */}
          <Styled.BorderLayer $offset={8} $opacity={0.8} />
          <Styled.BorderLayer $offset={16} $opacity={0.6} />
          <Styled.BorderLayer $offset={24} $opacity={0.4} />
          <Styled.BorderLayer $offset={32} $opacity={0.3} />
          <Styled.BorderLayer $offset={40} $opacity={0.2} />
          <Styled.BorderLayer $offset={48} $opacity={0.15} />

          <Styled.NeonLinesContainer>
            <Styled.NeonLine />
            <Styled.NeonLine $delay={0.5} />
            <Styled.NeonLine $delay={1} />
          </Styled.NeonLinesContainer>

          <Styled.ContentWrapper>
            <Styled.VideoSection as={motion.div} variants={videoVariants}>
              {cheat.videoUrl ? (
                <VideoPlayer
                  src={cheat.videoUrl}
                  poster={cheat.videoThumbnail}
                  title="Видео инструкция"
                  controls={true}
                  autoplay={false}
                />
              ) : (
                <Styled.VideoPlaceholder>
                  <svg
                    width="80"
                    height="80"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <path d="M14 2v6h6" />
                    <circle cx="12" cy="13" r="1" />
                    <path d="M10 16h4" />
                  </svg>
                </Styled.VideoPlaceholder>
              )}
            </Styled.VideoSection>

            <Styled.DetailsSection as={motion.div} variants={itemVariants}>
              <Styled.RightNeonBorder />
              <Styled.CurvedNeonLine />

              <Styled.ProductName>{cheat.brandName}</Styled.ProductName>

              {cheat.descriptionMarkdown && (
                <Styled.MarkdownContent>
                  <ReactMarkdown
                    remarkPlugins={[remarkBreaks]}
                    rehypePlugins={[rehypeRaw]}
                  >
                    {cheat.descriptionMarkdown}
                  </ReactMarkdown>
                </Styled.MarkdownContent>
              )}

              {cheat.buttonText && (
                <Styled.ReviewsButton
                  as={motion.button}
                  whileHover={
                    prefersReducedMotion
                      ? {}
                      : {
                          scale: 1.02,
                          transition: {
                            duration: 0.3,
                            ease: [0.22, 1, 0.36, 1],
                          },
                        }
                  }
                  whileTap={
                    prefersReducedMotion
                      ? {}
                      : {
                          scale: 0.98,
                          transition: {
                            duration: 0.15,
                            ease: [0.22, 1, 0.36, 1],
                          },
                        }
                  }
                >
                  {cheat.buttonText}
                </Styled.ReviewsButton>
              )}
            </Styled.DetailsSection>
          </Styled.ContentWrapper>
        </Styled.BorderWrapper>
      </motion.div>
    </Styled.Container>
  );
}
