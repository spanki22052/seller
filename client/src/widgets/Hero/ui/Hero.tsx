"use client";

import React from "react";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import * as Styled from "./styled";
import mainpageImage from "@/shared/assets/images/mainpage-up.png";

export const Hero = () => {
  const { t } = useTranslation();

  return (
    <Styled.HeroSection>
      <Styled.HeroContent>
        <Styled.HeroTextWrapper>
          <Styled.HeroText
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {t("heroText")}
            <br />
            <Styled.DiscountText>{t("getDiscounts")}</Styled.DiscountText>
          </Styled.HeroText>
          <Styled.ButtonGroup
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Styled.LinkButton>{t("spoofer")}</Styled.LinkButton>
            <Styled.PrimaryButton>{t("howToBuy")}</Styled.PrimaryButton>
          </Styled.ButtonGroup>
        </Styled.HeroTextWrapper>
        <Styled.HeroImage>
          <Styled.GlowEffect />
          <Styled.ImageContainer
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Styled.HeroImgWrapper>
              <Image
                src={mainpageImage}
                alt="Cyberpunk Abstract Figure"
                fill
                priority
                style={{
                  objectFit: "contain",
                }}
                sizes="(max-width: 1024px) 100vw, 55vw"
              />
            </Styled.HeroImgWrapper>
          </Styled.ImageContainer>
          {/* <Styled.TeaserButton
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Styled.TeaserText>{t("teaser")}</Styled.TeaserText>
          <Styled.TeaserLine />
        </Styled.TeaserButton> */}
        </Styled.HeroImage>
      </Styled.HeroContent>
    </Styled.HeroSection>
  );
};
