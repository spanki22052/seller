"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import * as Styled from "./styled";

export const ProductHero = () => {
  const { t } = useTranslation();

  return (
    <Styled.HeroSection>
      <Styled.BackgroundGlow1 />
      <Styled.BackgroundGlow2 />
      <Styled.Container>
        <Styled.ContentWrapper>
          <Styled.TextSection
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <Styled.BrandLabel>{t("product.brand")}</Styled.BrandLabel>
            <Styled.Title>
              {t("product.title")}
              <br />
              <Styled.Subtitle>{t("product.subtitle")}</Styled.Subtitle>
            </Styled.Title>
            <Styled.ButtonGroup
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <Styled.PrimaryButton
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t("product.buyNow")}
              </Styled.PrimaryButton>
              <Styled.SecondaryButton
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {t("product.cheatStatus")}
              </Styled.SecondaryButton>
            </Styled.ButtonGroup>
            <Styled.TelegramNote>{t("product.telegramNote")}</Styled.TelegramNote>
            <Styled.InfoSection
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <Styled.InfoTitle>BYSTER</Styled.InfoTitle>
              <Styled.InfoList>
                <Styled.InfoItem>
                  <Styled.InfoLabel>{t("product.windows")}</Styled.InfoLabel>
                  <Styled.InfoValue>{t("product.windowsVersion")}</Styled.InfoValue>
                </Styled.InfoItem>
                <Styled.InfoItem>
                  <Styled.InfoText>{t("product.processors")}</Styled.InfoText>
                  <Styled.InfoValue>{t("product.intelAmd")}</Styled.InfoValue>
                </Styled.InfoItem>
                <Styled.InfoItem>
                  <Styled.InfoText>{t("product.windowMode")}</Styled.InfoText>
                  <Styled.InfoValue>{t("product.fullscreen")}</Styled.InfoValue>
                </Styled.InfoItem>
                <Styled.InfoItem>
                  <Styled.InfoText>{t("product.supports")}</Styled.InfoText>
                  <Styled.InfoValue>{t("product.steamLauncher")}</Styled.InfoValue>
                </Styled.InfoItem>
              </Styled.InfoList>
              <Styled.ReviewsButton
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {t("product.reviews")}
              </Styled.ReviewsButton>
            </Styled.InfoSection>
          </Styled.TextSection>
        </Styled.ContentWrapper>
      </Styled.Container>
    </Styled.HeroSection>
  );
};

