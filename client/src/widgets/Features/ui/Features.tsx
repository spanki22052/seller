"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import * as Styled from "./styled";
import { features } from "../mocks/mock";

export const Features = () => {
  const { t } = useTranslation();

  return (
    <Styled.FeaturesContainer>
      <Styled.Title>{t("whyUs")}</Styled.Title>
      <Styled.Grid>
        {features.map((feature, index) => (
          <motion.div
            key={feature.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Styled.FeatureCard>
              <Styled.Icon>{feature.icon}</Styled.Icon>
              <Styled.FeatureTitle>{t(feature.key)}</Styled.FeatureTitle>
              <Styled.FeatureDesc>{t(feature.descKey)}</Styled.FeatureDesc>
            </Styled.FeatureCard>
          </motion.div>
        ))}
      </Styled.Grid>
    </Styled.FeaturesContainer>
  );
};

