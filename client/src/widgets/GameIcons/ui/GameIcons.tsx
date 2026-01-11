"use client";

import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useReducedMotion } from "@/shared/lib/hooks/useReducedMotion";
import { getGames, gameKeys } from "@/entities/game";
import { getSettings, settingsKeys } from "@/entities/settings";
import * as Styled from "./styled";

export function GameIcons() {
  const router = useRouter();
  const prefersReducedMotion = useReducedMotion();

  const { data: games = [] } = useQuery({
    queryKey: gameKeys.lists(),
    queryFn: getGames,
  });

  const { data: settings } = useQuery({
    queryKey: settingsKeys.detail(),
    queryFn: getSettings,
  });

  // Filter games based on settings - show only selected games
  const selectedGameIds = settings?.gameIdsForIcons || [];
  const displayGames = games.filter((game) =>
    selectedGameIds.includes(game.id)
  );

  const isLoading = !settings || games.length === 0;

  const handleGameClick = (gameId: string) => {
    router.push(`/game/${gameId}`);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.1,
        delayChildren: prefersReducedMotion ? 0 : 0.3,
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
  if (isLoading) {
    return null; // или можно показать скелетон/загрузку
  }

  return (
    <Styled.Container
      as={motion.div}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {displayGames.map((game) => (
        <Styled.GameItem
          key={game.id}
          as={motion.div}
          variants={itemVariants}
          whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
          onClick={() => handleGameClick(game.id)}
        >
          <Styled.GameIcon>
            <Styled.GameImage
              src={game.icon || game.image || `https://picsum.photos/400/400`}
              alt={game.name}
              onContextMenu={(e) => e.preventDefault()}
              onError={(e) => {
                const target = e.currentTarget;
                // Fallback to a different random image if the first one fails
                target.src = `https://picsum.photos/400/400`;
              }}
            />
          </Styled.GameIcon>
          <Styled.GameName>{game.name}</Styled.GameName>
        </Styled.GameItem>
      ))}
    </Styled.Container>
  );
}
