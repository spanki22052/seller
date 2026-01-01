"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import * as Styled from "./styled";
import { games, filters, featuredGameImage } from "../mocks/mock";

export const GameCards = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const handleGameClick = () => {
    router.push("/product");
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
          onClick={handleGameClick}
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
                onClick={handleGameClick}
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

