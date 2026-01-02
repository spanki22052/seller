"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/shared/lib/hooks/useReducedMotion";
import steamImage from "@/shared/assets/images/steam.png";
import originImage from "@/shared/assets/images/origin.png";
import epicGamesImage from "@/shared/assets/images/epic-games.png";
import uplayImage from "@/shared/assets/images/uplay.png";
import * as Styled from "./styled";

const platforms = [
  { id: "steam", name: "Steam", image: steamImage },
  { id: "origin", name: "Origin", image: originImage },
  { id: "epic", name: "Epic Games", image: epicGamesImage },
  { id: "uplay", name: "Uplay", image: uplayImage },
];

export function AccountShop() {
  const prefersReducedMotion = useReducedMotion();

  const boxVariants = {
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

  return (
    <Styled.Wrapper>
      {/* Main Account Store Block */}
      <Styled.MainContainer
        as={motion.div}
        variants={boxVariants}
        initial="hidden"
        animate="visible"
      >
        <Styled.LeftContent>
          <Styled.LogosContainer>
            {platforms.map((platform) => (
              <Styled.LogoWrapper key={platform.id}>
                <Image
                  src={platform.image}
                  alt={platform.name}
                  width={40}
                  height={40}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              </Styled.LogoWrapper>
            ))}
          </Styled.LogosContainer>

          <Styled.Title>Магазин аккаунтов</Styled.Title>

          <Styled.Description>
            Огромный выбор аккаунтов Steam, Epic games, Origin, Uplay.
            Заглядывайте в наш магазин по чаще! Мы постоянно пополняем новые
            игры!
          </Styled.Description>

          <Styled.ButtonWrapper>
            <Styled.MotionButtonWrapper
              as={motion.div}
              initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.9 }}
              animate={prefersReducedMotion ? {} : { opacity: 1, scale: 1 }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.4,
                delay: prefersReducedMotion ? 0 : 0.3,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={
                prefersReducedMotion
                  ? {}
                  : {
                      scale: 1.05,
                      transition: { duration: 0.2 },
                    }
              }
              whileTap={
                prefersReducedMotion
                  ? {}
                  : {
                      scale: 0.98,
                      transition: { duration: 0.1 },
                    }
              }
            >
              <Styled.GoButton type="primary" size="large">
                перейти
              </Styled.GoButton>
            </Styled.MotionButtonWrapper>
          </Styled.ButtonWrapper>
        </Styled.LeftContent>

        {/* Right Side Blocks */}
        <Styled.RightColumn>
          {/* ClubHouse Block */}
          <Styled.SideContainer
            as={motion.div}
            variants={boxVariants}
            initial="hidden"
            animate="visible"
            transition={{
              delay: prefersReducedMotion ? 0 : 0.1,
            }}
          >
            <Styled.Title>ClubHouse</Styled.Title>
            <Styled.Description>
              Приглашение в одну из самых обсуждаемых социальных сетей
            </Styled.Description>
          </Styled.SideContainer>

          {/* Warface Account Store Block */}
          <Styled.SideContainer
            as={motion.div}
            variants={boxVariants}
            initial="hidden"
            animate="visible"
            transition={{
              delay: prefersReducedMotion ? 0 : 0.2,
            }}
          >
            <Styled.Title>Магазин аккаунтов</Styled.Title>
            <Styled.Description>
              Warface аккаунты по низким ценам!
            </Styled.Description>
          </Styled.SideContainer>
        </Styled.RightColumn>
      </Styled.MainContainer>
    </Styled.Wrapper>
  );
}
