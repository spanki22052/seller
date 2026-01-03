"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/shared/lib/hooks/useReducedMotion";
import { NeonLine } from "@/shared/ui/NeonLine";
import { cheats } from "../lib/constants";
import { Cheat } from "../model/types";
import * as Styled from "./styled";

interface CheatsListProps {
  gameId?: string;
}

export function CheatsList({ gameId }: CheatsListProps) {
  const router = useRouter();
  const prefersReducedMotion = useReducedMotion();

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
    hidden: prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: prefersReducedMotion ? 0 : 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.3,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const formatPrice = (price: Cheat["price"]): string => {
    if (price.amount === null) {
      return "От ???";
    }
    return `От ${price.amount}`;
  };

  const handleCheatClick = (cheatId: string) => {
    console.log(gameId);
    if (gameId) {
      router.push(`/game/${gameId}/cheat/${cheatId}`);
    }
  };

  return (
    <Styled.Container
      as={motion.div}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {cheats.map((cheat) => (
        <Styled.CheatCard
          key={cheat.id}
          as={motion.div}
          variants={itemVariants}
          whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
          whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
          onClick={() => handleCheatClick(cheat.id)}
        >
          <Styled.ImageWrapper>
            <Image
              src={cheat.image}
              alt={cheat.name}
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
              style={{ objectFit: "cover" }}
            />
            <Styled.ChitarenaOverlay />
            {cheat.isNew && <Styled.NewBadge>NEW</Styled.NewBadge>}
            {cheat.isComingSoon && (
              <Styled.ComingSoonBadge>СКОРО</Styled.ComingSoonBadge>
            )}
          </Styled.ImageWrapper>
          <Styled.CardContent>
            <Styled.CheatName>{cheat.name}</Styled.CheatName>
            <Styled.Price>
              <Styled.PriceAmount>
                {formatPrice(cheat.price)}
              </Styled.PriceAmount>
              <Styled.PriceCurrency>
                {cheat.price.currency}
              </Styled.PriceCurrency>
            </Styled.Price>
          </Styled.CardContent>
          <NeonLine data-neon-line />
        </Styled.CheatCard>
      ))}
    </Styled.Container>
  );
}
