"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { cheatCards } from "@/widgets/CheatCards/mocks/mock";
import * as Styled from "./styled";
import { games, filters, featuredGameImage } from "../mocks/mock";

export const GameCards = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const handleGameClick = (gameName?: string) => () => {
    // Find matching cheat card by game name
    let cheatId = cheatCards[0]?.id || "1";
    
    if (gameName) {
      // Try to find cheat card that matches the game name
      const cheatCard = cheatCards.find((card) => {
        const cardName = card.nameKey.toLowerCase();
        const cardDesc = card.descriptionKey.toLowerCase();
        const searchName = gameName.toLowerCase();
        // Check if game name appears in cheat card name or description
        return cardName.includes(searchName) || cardDesc.includes(searchName);
      });
      
      if (cheatCard) {
        cheatId = cheatCard.id;
      } else {
        // Fallback: try to match by common game name variations
        const gameNameLower = gameName.toLowerCase();
        if (gameNameLower.includes("apex")) {
          cheatId = cheatCards.find((c) => c.nameKey.includes("apex"))?.id || cheatId;
        } else if (gameNameLower.includes("rust")) {
          cheatId = cheatCards.find((c) => c.nameKey.includes("rust"))?.id || cheatId;
        } else if (gameNameLower.includes("valorant")) {
          cheatId = cheatCards.find((c) => c.nameKey.includes("valorant"))?.id || cheatId;
        } else if (gameNameLower.includes("cs") || gameNameLower.includes("counter")) {
          cheatId = cheatCards.find((c) => c.nameKey.includes("cs2") || c.nameKey.includes("counter"))?.id || cheatId;
        } else if (gameNameLower.includes("overwatch")) {
          cheatId = cheatCards.find((c) => c.nameKey.includes("overwatch"))?.id || cheatId;
        } else if (gameNameLower.includes("elden") || gameNameLower.includes("ring")) {
          cheatId = cheatCards.find((c) => c.nameKey.includes("elden"))?.id || cheatId;
        }
      }
    }
    
    router.push(`/product?id=${cheatId}`);
  };

  return (
    <Styled.Section>
      <Styled.Container>
        <Styled.Filters>
          <Styled.FilterLabel>{t("cheatsForGames")}</Styled.FilterLabel>
          {filters.map((filter) => (
            <Styled.FilterButton key={filter} $active={filter === "recommended"}>
              {t(filter)}
            </Styled.FilterButton>
          ))}
        </Styled.Filters>

        <Styled.FeaturedGame
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleGameClick("Path of Exile 2")}
        >
          <Styled.FeaturedImage
            src={featuredGameImage}
            alt="Path of Exile 2 Background"
          />
          <Styled.FeaturedOverlay />
          <Styled.FeaturedTitle>PATH OF EXILE 2</Styled.FeaturedTitle>
        </Styled.FeaturedGame>

        <Styled.Grid>
          {games.map((game, index) => (
            <motion.div
              key={game.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <Styled.GameCard
                whileHover={{ scale: 1.02, y: -4 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleGameClick(game.name)}
              >
                <Styled.GameImage src={game.image} alt={game.name} />
                <Styled.GameOverlay />
                <Styled.GameTitle>{game.name}</Styled.GameTitle>
              </Styled.GameCard>
            </motion.div>
          ))}
        </Styled.Grid>
      </Styled.Container>
    </Styled.Section>
  );
};

