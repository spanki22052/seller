"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sidebar } from "@/widgets/Sidebar";
import { Navbar } from "@/shared/ui/Navbar";
import { useReducedMotion } from "@/shared/lib/hooks/useReducedMotion";
import { pageAnimations } from "../lib/animConstants";
import * as Styled from "./styled";

export function NotFoundPage() {
  const prefersReducedMotion = useReducedMotion();

  const containerVariants = prefersReducedMotion
    ? pageAnimations.reducedMotion.container
    : pageAnimations.container;

  const number404Variants = prefersReducedMotion
    ? pageAnimations.reducedMotion.number404
    : pageAnimations.number404;

  const errorTextVariants = prefersReducedMotion
    ? pageAnimations.reducedMotion.errorText
    : pageAnimations.errorText;

  const garbledTextVariants = prefersReducedMotion
    ? pageAnimations.reducedMotion.garbledText
    : pageAnimations.garbledText;

  const buttonVariants = prefersReducedMotion
    ? pageAnimations.reducedMotion.button
    : pageAnimations.button;

  return (
    <>
      <Sidebar />
      <Navbar />
      <Styled.Container
        as={motion.div}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Styled.MainContent>
          <Styled.ErrorCard>
            <Styled.Content>
              <Styled.ErrorHeader>
                <Styled.ErrorLabel
                  as={motion.span}
                  variants={errorTextVariants}
                >
                  ОШИБКА
                </Styled.ErrorLabel>
                <Styled.Number404 as={motion.h1} variants={number404Variants}>
                  404
                </Styled.Number404>
              </Styled.ErrorHeader>

              <Styled.GarbledText as={motion.p} variants={garbledTextVariants}>
                7B9Sy&apos;U@Ar94LÏ±g5i~fœoäï
              </Styled.GarbledText>

              <Styled.ButtonWrapper as={motion.div} variants={buttonVariants}>
                <Link href="/">
                  <Styled.HomeButton
                    as={motion.a}
                    whileHover={
                      prefersReducedMotion
                        ? undefined
                        : pageAnimations.button.hover
                    }
                    whileTap={
                      prefersReducedMotion
                        ? undefined
                        : pageAnimations.button.tap
                    }
                  >
                    НА ГЛАВНУЮ
                  </Styled.HomeButton>
                </Link>
              </Styled.ButtonWrapper>
            </Styled.Content>
          </Styled.ErrorCard>
        </Styled.MainContent>
      </Styled.Container>
    </>
  );
}

export default NotFoundPage;
