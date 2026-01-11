"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkBreaks from "remark-breaks";
import { useReducedMotion } from "@/shared/lib/hooks/useReducedMotion";
import { getCheat, cheatKeys } from "@/entities/cheat";
import {
  EXPANDABLE_ANIMATION_CONFIG,
  ICON_ROTATION_CONFIG,
  STAGGER_ANIMATION_CONFIG,
  SECTION_IDS,
} from "../model/constants";
import type { CheatDetailsProps, ExpandedSection } from "../model/types";
import * as Styled from "./styled";

const {
  LeftColumn,
  RightColumn,
  Card,
  Header,
  Title,
  Subtitle,
  Content,
  Footer,
  FooterText,
  MarkdownH1,
  MarkdownH2,
  MarkdownH3,
  MarkdownP,
  MarkdownUl,
  MarkdownOl,
  MarkdownLi,
  MarkdownCode,
  MarkdownPre,
  MarkdownBlockquote,
  MarkdownLink,
  MarkdownStrong,
  MarkdownEm,
} = Styled;

export function CheatDetails({ cheatId }: CheatDetailsProps) {
  const [expandedSection, setExpandedSection] = useState<ExpandedSection>(null);
  const prefersReducedMotion = useReducedMotion();

  const { data: cheat, isLoading } = useQuery({
    queryKey: cheatKeys.detail(cheatId),
    queryFn: () => getCheat(cheatId),
  });

  if (isLoading || !cheat) {
    return null;
  }

  const toggleSection = (sectionId: ExpandedSection) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  // Animation variants with reduced motion support
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        ...STAGGER_ANIMATION_CONFIG,
        delayChildren: prefersReducedMotion ? 0 : 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: prefersReducedMotion ? 0 : 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.3,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const contentVariants = {
    collapsed: {
      ...EXPANDABLE_ANIMATION_CONFIG.collapsed,
      transition: prefersReducedMotion
        ? { duration: 0 }
        : EXPANDABLE_ANIMATION_CONFIG.transition,
    },
    expanded: {
      ...EXPANDABLE_ANIMATION_CONFIG.expanded,
      transition: prefersReducedMotion
        ? { duration: 0 }
        : EXPANDABLE_ANIMATION_CONFIG.transition,
    },
  };

  return (
    <LayoutGroup>
      <Styled.Container>
        <Card
          as={motion.div}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Header>
            <Title>Детали DLC</Title>
            <Subtitle>
              Подробная информация о функциях и возможностях DLC
            </Subtitle>
          </Header>

          <Content>
            <LeftColumn>
              {/* Description Section */}
              <Styled.Section as={motion.div} variants={itemVariants}>
                <Styled.SectionHeader
                  $isExpanded={expandedSection === SECTION_IDS.DESCRIPTION}
                  onClick={() => toggleSection(SECTION_IDS.DESCRIPTION)}
                >
                  <Styled.SectionTitle>
                    Требования для устройства
                  </Styled.SectionTitle>
                  <Styled.ExpandIcon
                    as={motion.div}
                    animate={
                      expandedSection === SECTION_IDS.DESCRIPTION
                        ? ICON_ROTATION_CONFIG.expanded
                        : ICON_ROTATION_CONFIG.collapsed
                    }
                    transition={
                      prefersReducedMotion
                        ? { duration: 0 }
                        : ICON_ROTATION_CONFIG.transition
                    }
                  />
                </Styled.SectionHeader>

                <AnimatePresence>
                  {expandedSection === SECTION_IDS.DESCRIPTION &&
                    cheat.descriptionMarkdown && (
                      <Styled.SectionContent
                        as={motion.div}
                        variants={contentVariants}
                        initial="collapsed"
                        animate="expanded"
                        exit="collapsed"
                      >
                        <Styled.DescriptionContent>
                          <ReactMarkdown
                            remarkPlugins={[remarkBreaks]}
                            rehypePlugins={[rehypeRaw]}
                            components={{
                              h1: ({ children }) => (
                                <Styled.MarkdownH1>
                                  {children}
                                </Styled.MarkdownH1>
                              ),
                              h2: ({ children }) => (
                                <Styled.MarkdownH2>
                                  {children}
                                </Styled.MarkdownH2>
                              ),
                              h3: ({ children }) => (
                                <Styled.MarkdownH3>
                                  {children}
                                </Styled.MarkdownH3>
                              ),
                              p: ({ children }) => (
                                <Styled.MarkdownP>{children}</Styled.MarkdownP>
                              ),
                              ul: ({ children }) => (
                                <Styled.MarkdownUl>
                                  {children}
                                </Styled.MarkdownUl>
                              ),
                              ol: ({ children }) => (
                                <Styled.MarkdownOl>
                                  {children}
                                </Styled.MarkdownOl>
                              ),
                              li: ({ children }) => (
                                <Styled.MarkdownLi>
                                  {children}
                                </Styled.MarkdownLi>
                              ),
                              code: ({ children }) => (
                                <Styled.MarkdownCode>
                                  {children}
                                </Styled.MarkdownCode>
                              ),
                              pre: ({ children }) => (
                                <Styled.MarkdownPre>
                                  {children}
                                </Styled.MarkdownPre>
                              ),
                              blockquote: ({ children }) => (
                                <Styled.MarkdownBlockquote>
                                  {children}
                                </Styled.MarkdownBlockquote>
                              ),
                              a: ({ href, children }) => (
                                <Styled.MarkdownLink href={href}>
                                  {children}
                                </Styled.MarkdownLink>
                              ),
                              strong: ({ children }) => (
                                <Styled.MarkdownStrong>
                                  {children}
                                </Styled.MarkdownStrong>
                              ),
                              em: ({ children }) => (
                                <Styled.MarkdownEm>
                                  {children}
                                </Styled.MarkdownEm>
                              ),
                            }}
                          >
                            {cheat.descriptionMarkdown}
                          </ReactMarkdown>
                        </Styled.DescriptionContent>
                      </Styled.SectionContent>
                    )}
                </AnimatePresence>
              </Styled.Section>
            </LeftColumn>

            <RightColumn>
              {/* Functions Section */}
              {cheat.functions && cheat.functions.length > 0 && (
                <Styled.Section as={motion.div} variants={itemVariants}>
                  <Styled.SectionHeader
                    $isExpanded={expandedSection === SECTION_IDS.FUNCTIONS}
                    onClick={() => toggleSection(SECTION_IDS.FUNCTIONS)}
                  >
                    <Styled.SectionTitle>Функции</Styled.SectionTitle>
                    <Styled.ExpandIcon
                      as={motion.div}
                      animate={
                        expandedSection === SECTION_IDS.FUNCTIONS
                          ? ICON_ROTATION_CONFIG.expanded
                          : ICON_ROTATION_CONFIG.collapsed
                      }
                      transition={
                        prefersReducedMotion
                          ? { duration: 0 }
                          : ICON_ROTATION_CONFIG.transition
                      }
                    />
                  </Styled.SectionHeader>

                  <AnimatePresence>
                    {expandedSection === SECTION_IDS.FUNCTIONS && (
                      <Styled.SectionContent
                        as={motion.div}
                        variants={contentVariants}
                        initial="collapsed"
                        animate="expanded"
                        exit="collapsed"
                      >
                        <Styled.FunctionsList>
                          {cheat.functions.map((category, categoryIndex) => (
                            <Styled.FunctionCategory
                              key={category.id}
                              as={motion.div}
                              initial={
                                prefersReducedMotion
                                  ? {}
                                  : { opacity: 0, x: -20 }
                              }
                              animate={{ opacity: 1, x: 0 }}
                              transition={{
                                delay: prefersReducedMotion
                                  ? 0
                                  : categoryIndex * 0.1,
                                duration: prefersReducedMotion ? 0 : 0.3,
                                ease: [0.22, 1, 0.36, 1],
                              }}
                            >
                              <Styled.CategoryTitle>
                                {category.name}
                              </Styled.CategoryTitle>
                              <Styled.FeaturesList>
                                {category.features.map(
                                  (feature, featureIndex) => (
                                    <Styled.FeatureItem
                                      key={featureIndex}
                                      as={motion.li}
                                      initial={
                                        prefersReducedMotion
                                          ? {}
                                          : { opacity: 0, x: -10 }
                                      }
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{
                                        delay: prefersReducedMotion
                                          ? 0
                                          : categoryIndex * 0.1 +
                                            featureIndex * 0.05,
                                        duration: prefersReducedMotion
                                          ? 0
                                          : 0.2,
                                      }}
                                    >
                                      {" " + feature}
                                    </Styled.FeatureItem>
                                  )
                                )}
                              </Styled.FeaturesList>
                            </Styled.FunctionCategory>
                          ))}
                        </Styled.FunctionsList>
                      </Styled.SectionContent>
                    )}
                  </AnimatePresence>
                </Styled.Section>
              )}
            </RightColumn>
          </Content>

          <Footer>
            <FooterText>
              Информация предоставлена разработчиками DLC для вашего удобства
            </FooterText>
          </Footer>
        </Card>
      </Styled.Container>
    </LayoutGroup>
  );
}
