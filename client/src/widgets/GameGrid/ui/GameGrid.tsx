"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/shared/lib/hooks/useReducedMotion";
import { NeonLine } from "@/shared/ui/NeonLine";
import { games } from "../lib/constants";
import * as Styled from "./styled";

export function GameGrid() {
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

  const handleGameClick = (gameId: string) => {
    router.push(`/game/${gameId}`);
  };

  return (
    <Styled.Container
      as={motion.div}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {games.map((game) => (
        <Styled.GameTile
          key={game.id}
          as={motion.div}
          variants={itemVariants}
          whileHover={prefersReducedMotion ? {} : { scale: 1.02, y: -4 }}
          whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
          onClick={() => handleGameClick(game.id)}
        >
          <Styled.GameImageWrapper $backgroundColor={game.color}>
            {game.image && (
              <Styled.GameImage
                src={game.image}
                alt={game.name}
                onError={(e) => {
                  const target = e.currentTarget;
                  target.style.display = "none";
                }}
              />
            )}
          </Styled.GameImageWrapper>
          {game.name && <Styled.GameName>{game.name}</Styled.GameName>}
          <NeonLine data-neon-line />
        </Styled.GameTile>
      ))}
    </Styled.Container>
  );
}
