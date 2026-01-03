"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useReducedMotion } from "@/shared/lib/hooks/useReducedMotion";
import { functionCategories } from "../lib/constants";
import * as Styled from "./styled";

interface CheatFunctionsProps {
  cheatId: string;
}

export function CheatFunctions({ cheatId }: CheatFunctionsProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const toggleExpanded = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.05,
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
      height: 0,
      opacity: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.3,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    expanded: {
      height: "auto",
      opacity: 1,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.3,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <Styled.Container>
      <Styled.Title>Список функций</Styled.Title>
      <Styled.List
        as={motion.div}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {functionCategories.map((category) => {
          const isExpanded = expandedId === category.id;
          return (
            <Styled.Item
              key={category.id}
              as={motion.div}
              variants={itemVariants}
            >
              <Styled.Header 
                $isExpanded={isExpanded}
                onClick={() => toggleExpanded(category.id)}
              >
                <Styled.CategoryName>{category.name}</Styled.CategoryName>
                <Styled.Icon
                  as={motion.div}
                  animate={{ rotate: isExpanded ? 45 : 0 }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
                />
              </Styled.Header>
              <AnimatePresence>
                {isExpanded && (
                  <Styled.Content
                    as={motion.div}
                    variants={contentVariants}
                    initial="collapsed"
                    animate="expanded"
                    exit="collapsed"
                  >
                    <Styled.FeaturesList>
                      {category.features.map((feature, index) => (
                        <Styled.Feature
                          key={index}
                          as={motion.li}
                          initial={
                            prefersReducedMotion ? {} : { opacity: 0, x: -10 }
                          }
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            delay: prefersReducedMotion ? 0 : index * 0.05,
                            duration: prefersReducedMotion ? 0 : 0.2,
                          }}
                        >
                          {feature}
                        </Styled.Feature>
                      ))}
                    </Styled.FeaturesList>
                  </Styled.Content>
                )}
              </AnimatePresence>
            </Styled.Item>
          );
        })}
      </Styled.List>
    </Styled.Container>
  );
}
