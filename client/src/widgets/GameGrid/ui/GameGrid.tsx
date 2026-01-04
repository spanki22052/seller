"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { useReducedMotion } from "@/shared/lib/hooks/useReducedMotion";
import { NeonLine } from "@/shared/ui/NeonLine";
import { getGames, gameKeys, Game } from "@/entities/game";
import * as Styled from "./styled";

export function GameGrid() {
  const router = useRouter();
  const prefersReducedMotion = useReducedMotion();

  const { data: games = [], isLoading } = useQuery({
    queryKey: gameKeys.lists(),
    queryFn: getGames,
  });

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

  if (isLoading) {
    return (
      <Styled.Container>
        {Array.from({ length: 4 }).map((_, index) => (
          <Styled.GameTile key={`skeleton-${index}`}>
            <Styled.GameImageWrapper $backgroundColor="#333">
              <div style={{ width: "100%", height: "100%", backgroundColor: "#444" }} />
            </Styled.GameImageWrapper>
          </Styled.GameTile>
        ))}
      </Styled.Container>
    );
  }

  return (
    <Styled.Container
      as={motion.div}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {games.map((game: Game) => (
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
