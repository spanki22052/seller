"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import * as Styled from "./styled";

const SCREENSHOT_COUNT = 8;

export const ProductScreenshots = () => {
  const { t } = useTranslation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <Styled.Section>
      <Styled.Container>
        <Styled.Title
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          {t("product.screenshots")}
        </Styled.Title>
        <Styled.Grid
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {Array.from({ length: SCREENSHOT_COUNT }).map((_, index) => (
            <Styled.ScreenshotItem
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            />
          ))}
        </Styled.Grid>
      </Styled.Container>
    </Styled.Section>
  );
};

