"use client";

import React from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/shared/lib/hooks/useReducedMotion";
import { LINKS } from "../lib/constants";
import * as Styled from "./styled";

export function OfficialEmailInfo() {
  const prefersReducedMotion = useReducedMotion();

  const containerVariants = {
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

  const linkVariants = {
    hidden: prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: prefersReducedMotion ? 0 : 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.3,
        delay: prefersReducedMotion ? 0 : i * 0.1,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  return (
    <Styled.Container
      as={motion.div}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Styled.LinksContainer>
        {LINKS.map((link, index) => (
          <Styled.Link
            key={link.id}
            href={link.href}
            as={motion.a}
            variants={linkVariants}
            initial="hidden"
            animate="visible"
            custom={index}
          >
            {link.label}
          </Styled.Link>
        ))}
      </Styled.LinksContainer>
      <Styled.EmailInfoContainer>
        <Styled.CopyrightText>
          © Official email address of our site
        </Styled.CopyrightText>
        <Styled.EmailLink href="mailto:Chitarena@yandex.ru">
          Chitarena@yandex.ru
        </Styled.EmailLink>
      </Styled.EmailInfoContainer>
    </Styled.Container>
  );
}

