"use client";

import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import * as Styled from "./styled";

export const ProductFeatures = () => {
  const { t } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Styled.Section>
      <Styled.Container>
        <Styled.Title
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          {t("product.features")}
        </Styled.Title>
        <Styled.FeaturesCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <Styled.Header>
            <Styled.FunctionalityTitle>{t("product.functionality")}</Styled.FunctionalityTitle>
            <Styled.ExpandButton
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleExpand}
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="material-icons">expand_more</span>
            </Styled.ExpandButton>
          </Styled.Header>
          <AnimatePresence initial={false}>
            {isExpanded && (
              <Styled.Content
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <Styled.LeftColumn>
                  <Styled.OpenMenuText>{t("product.openMenu")}</Styled.OpenMenuText>
                  <Styled.CategoryTitle>{t("product.visual")}</Styled.CategoryTitle>
                  <Styled.FeatureList>
                    <li>{t("product.mapReveal")}</li>
                    <li>{t("product.infiniteZoom")}</li>
                    <li>{t("product.removeAtlasFog")}</li>
                    <li>{t("product.removeDeliriumFog")}</li>
                  </Styled.FeatureList>
                </Styled.LeftColumn>
                <Styled.RightColumn>
                  <Styled.CategoryTitle>{t("product.script")}</Styled.CategoryTitle>
                  <Styled.FeatureList>
                    <li>{t("product.autoHealth")}</li>
                    <li>{t("product.autoMana")}</li>
                    <li>{t("product.autoEnergyShield")}</li>
                    <li>{t("product.autoEsc")}</li>
                  </Styled.FeatureList>
                  <Styled.CategoryTitle style={{ marginTop: "24px" }}>
                    {t("product.misc")}
                  </Styled.CategoryTitle>
                  <Styled.FeatureList>
                    <li>{t("product.configSaveLoad")}</li>
                    <li>{t("product.customScale")}</li>
                  </Styled.FeatureList>
                </Styled.RightColumn>
              </Styled.Content>
            )}
          </AnimatePresence>
        </Styled.FeaturesCard>
      </Styled.Container>
    </Styled.Section>
  );
};

