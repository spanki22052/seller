"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/shared/lib/hooks/useReducedMotion";
import { NeonLine } from "@/shared/ui/NeonLine";
import { Cheat } from "@/entities/game";
import * as Styled from "./styled";

interface CheatsListProps {
  cheats: Cheat[];
  gameId: string;
}

export function CheatsList({ cheats, gameId }: CheatsListProps) {
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

  const getStatusLabel = (status: Cheat["status"]): string => {
    switch (status) {
      case "AVAILABLE":
        return "Доступен";
      case "UPDATING":
        return "Обновляется";
      case "FROZEN":
        return "Заморожен";
      default:
        return status;
    }
  };

  const getStatusColor = (status: Cheat["status"]): string => {
    switch (status) {
      case "AVAILABLE":
        return "#10b981"; // green
      case "UPDATING":
        return "#3b82f6"; // blue
      case "FROZEN":
        return "#6b7280"; // gray
      default:
        return "#6b7280";
    }
  };

  const handleCheatClick = (cheatId: string) => {
    router.push(`/game/${gameId}/cheat/${cheatId}`);
  };

  if (!cheats || cheats.length === 0) {
    return null;
  }

  console.log(cheats);

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
            {cheat.image ? (
              <Styled.CheatImageWrapper>
                <Styled.CheatImage src={cheat.image} alt={cheat.brandName} onContextMenu={(e) => e.preventDefault()} />
              </Styled.CheatImageWrapper>
            ) : (
              <Styled.Placeholder>{cheat.brandName}</Styled.Placeholder>
            )}
            <Styled.ChitarenaOverlay />
            <Styled.StatusBadge $color={getStatusColor(cheat.status)}>
              {getStatusLabel(cheat.status)}
            </Styled.StatusBadge>
            {cheat.isNew && <Styled.NewBadge>NEW</Styled.NewBadge>}
            {cheat.isComingSoon && (
              <Styled.ComingSoonBadge>СКОРО</Styled.ComingSoonBadge>
            )}
          </Styled.ImageWrapper>
          <Styled.CardContent>
            <Styled.CheatName>{cheat.brandName}</Styled.CheatName>
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
