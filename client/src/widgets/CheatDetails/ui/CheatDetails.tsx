"use client";

import React, { useCallback } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/shared/lib/hooks/useReducedMotion";
import { cheatDetailsData } from "../lib/constants";
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
  const data =
    cheatDetailsData[cheatId || "default"] || cheatDetailsData.default;

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
          {data.breadcrumbs.map((crumb, index) => (
            <React.Fragment key={index}>
              <Styled.BreadcrumbLink
                href={crumb.href || "#"}
                $isActive={index === data.breadcrumbs.length - 1}
                onClick={(e) => handleBreadcrumbClick(e, crumb.sectionId)}
              >
                {crumb.label}
              </Styled.BreadcrumbLink>
              {index < data.breadcrumbs.length - 1 && (
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
              {data.videoUrl ? (
                <Styled.VideoElement
                  src={data.videoUrl}
                  controls
                  poster={data.videoThumbnail}
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

              <Styled.ProductName>{data.productName}</Styled.ProductName>

              <Styled.SpecsList>
                <Styled.SpecItem>
                  <Styled.SpecHighlight>
                    {data.windowsVersion}
                  </Styled.SpecHighlight>
                </Styled.SpecItem>
                <Styled.SpecItem>
                  Поддерживаемая версия игры: {data.gameVersion}
                </Styled.SpecItem>
                <Styled.SpecItem>Режим игры: {data.gameMode}</Styled.SpecItem>
                <Styled.SpecItem>Процессоры: {data.processors}</Styled.SpecItem>
              </Styled.SpecsList>

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
                {data.buttonText}
              </Styled.ReviewsButton>
            </Styled.DetailsSection>
          </Styled.ContentWrapper>
        </Styled.BorderWrapper>
      </motion.div>
    </Styled.Container>
  );
}
