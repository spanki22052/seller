"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import * as Styled from "./styled";

export const ProductVideo = () => {
  const { t } = useTranslation();

  return (
    <Styled.Section>
      <Styled.Container>
        <Styled.Title
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          {t("product.videoTitle")}
        </Styled.Title>
        <Styled.VideoCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <Styled.GradientOverlay />
          <Styled.ContentWrapper>
            <Styled.VideoContainer
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <Styled.VideoThumbnail
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD7LmdvWY3_tG9LGLaLEzf2-lP8BDiYS3_vJGTNo9vD6ItJqRrn1AGlfYEuCK7irkGploQoiHNkBhV-1Uz0cc1OSxQRmexahOIBUUtt37MJ_3q6WvuSkfLnY76dYoXTrx0l3uIZwboyy9jIYVYOd80g2e-pIWpucPOuhZfdba1IyvcrEECtH2e91jdwTYof96Xt16Ksnuz4Mwp2Eo-b4Zx5hjFEGHxwck3nwa-i2Jkqc1NaMulNWL10wDbf9qNDNR2Jrib7e3DxLg"
                alt="Video thumbnail"
              />
              <Styled.PlayButtonOverlay>
                <Styled.PlayButton
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <span className="material-icons">play_arrow</span>
                </Styled.PlayButton>
              </Styled.PlayButtonOverlay>
            </Styled.VideoContainer>
            <Styled.TextSection>
              <Styled.AccentLine />
              <Styled.TextContent>
                <Styled.HowToBuyTitle>{t("product.howToBuy")}</Styled.HowToBuyTitle>
                <Styled.Description>
                  <p>{t("product.howToBuyText1")}</p>
                  <p>{t("product.howToBuyText2")}</p>
                </Styled.Description>
              </Styled.TextContent>
            </Styled.TextSection>
          </Styled.ContentWrapper>
        </Styled.VideoCard>
      </Styled.Container>
    </Styled.Section>
  );
};

