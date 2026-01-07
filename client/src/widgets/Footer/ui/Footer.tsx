"use client";

import React from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/shared/lib/hooks/useReducedMotion";
import { useQuery } from "@tanstack/react-query";
import { getSettings, settingsKeys } from "@/entities/settings";
import * as Styled from "./styled";

export function Footer() {
  const prefersReducedMotion = useReducedMotion();

  const { data: settings } = useQuery({
    queryKey: settingsKeys.detail(),
    queryFn: getSettings,
  });

  const links = settings?.footerLinks || [];

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

  const dividerVariants = {
    hidden: prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scaleX: 0 },
    visible: {
      opacity: 1,
      scaleX: prefersReducedMotion ? 1 : 1,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.6,
        ease: [0.22, 1, 0.36, 1],
        delay: prefersReducedMotion ? 0 : 0.2,
      },
    },
  };

  const neonGlowVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: prefersReducedMotion ? 0.4 : [0.4, 0.8, 0.4],
      transition: prefersReducedMotion
        ? { duration: 0 }
        : {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          },
    },
  };

  const neonDotsVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: prefersReducedMotion ? 1 : [0.5, 1, 0.5],
      transition: prefersReducedMotion
        ? { duration: 0 }
        : {
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.7,
          },
    },
  };

  return (
    <Styled.Container
      as={motion.div}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Styled.Divider
        as={motion.div}
        variants={dividerVariants}
        initial="hidden"
        animate="visible"
      >
        <Styled.NeonGlow
          as={motion.div}
          variants={neonGlowVariants}
          initial="hidden"
          animate="visible"
        />
        <Styled.NeonDots
          as={motion.div}
          variants={neonDotsVariants}
          initial="hidden"
          animate="visible"
        />
      </Styled.Divider>

      <Styled.LinksContainer>
        {links.map((link, index) => (
          <Styled.Link
            key={`${link.label}-${index}`}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
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
