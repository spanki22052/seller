"use client";

import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useReducedMotion } from "@/shared/lib/hooks/useReducedMotion";
import * as Styled from "./styled";

interface Game {
  id: string;
  name: string;
  image: string;
}

// Generate random images using Picsum Photos
const getRandomImage = (
  _seed: string,
  width: number = 400,
  height: number = 400
) => {
  // Picsum Photos format: /{width}/{height} returns random images from Unsplash
  // Returns random photos from Picsum Photos service
  return `https://picsum.photos/${width}/${height}`;
};

const games: Game[] = [
  { id: "rust", name: "RUST", image: getRandomImage("rust") },
  { id: "abi", name: "ABI", image: getRandomImage("abi") },
  { id: "dayz", name: "DAYZ", image: getRandomImage("dayz") },
  { id: "stalkreft", name: "STALKREFT", image: getRandomImage("stalkreft") },
  { id: "eft", name: "EFT", image: getRandomImage("eft") },
];

export function GameIcons() {
  const router = useRouter();
  const prefersReducedMotion = useReducedMotion();

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
  return (
    <Styled.Container
      as={motion.div}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {games.map((game) => (
        <Styled.GameItem
          key={game.id}
          as={motion.div}
          variants={itemVariants}
          whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
          whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
          onClick={() => handleGameClick(game.id)}
        >
          <Styled.GameIcon>
            <Styled.GameImage
              src={game.image}
              alt={game.name}
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
