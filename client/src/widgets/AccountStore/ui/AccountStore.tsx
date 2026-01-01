"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import * as Styled from "./styled";

export const AccountStore = () => {
  const { t } = useTranslation();

  return (
    <Styled.Section>
      <Styled.Container>
        <Styled.Banner>
          <Styled.BannerImage
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBRZXCjDDeWmf5yRNkBEkaP648DAVbtvUs4S4-MbteDEJm-6BcQ45Bx9hq_RHIT-s8ux4j3VpdUk2GZ2q1e5b4FEOlT7VXHxr8ooMFnL8mv2gYCHcWjhWmWfrk5fEcNZnZILhO748iw_QwRuASW34oQQhGv4G85QmRJHepUE3-FictiAkEBa2da1NfviLKaZtPd-LlL2-aYXNa64yVW3dNaLd8MRRnybm0S9VTuomKM1XrRoD62DXqqMWoipXCvAg26bAd3qJpqWw"
            alt="World of Warcraft"
          />
          <Styled.BannerOverlay />
          <Styled.BannerTitle>WORLD OF WARCRAFT</Styled.BannerTitle>
        </Styled.Banner>

        <Styled.Content>
          <Styled.Title>{t("accountStore")}</Styled.Title>
          <Styled.Description>{t("accountStoreDesc")}</Styled.Description>
          <Styled.Button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            {t("toStore")}
          </Styled.Button>
          <Styled.FooterText>{t("checkStore")}</Styled.FooterText>
        </Styled.Content>
      </Styled.Container>
    </Styled.Section>
  );
};

