"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import * as Styled from "./styled";

const securityFeatures = [
  {
    icon: "security",
    titleKey: "product.dataProtection",
    descKey: "product.dataProtectionDesc",
  },
  {
    icon: "flash_on",
    titleKey: "product.instant",
    descKey: "product.instantDesc",
  },
  {
    icon: "support_agent",
    titleKey: "product.support247",
    descKey: "product.support247Desc",
  },
  {
    icon: "verified",
    titleKey: "product.guarantee",
    descKey: "product.guaranteeDesc",
  },
];

export const ProductSecurity = () => {
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
          {t("product.securePurchase")}
        </Styled.Title>
        <Styled.Grid
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {securityFeatures.map((feature, index) => (
            <Styled.Card
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -4 }}
              whileTap={{ scale: 0.98 }}
            >
              <Styled.IconContainer>
                <span className="material-icons">{feature.icon}</span>
              </Styled.IconContainer>
              <Styled.CardTitle>{t(feature.titleKey)}</Styled.CardTitle>
              <Styled.CardDescription>{t(feature.descKey)}</Styled.CardDescription>
            </Styled.Card>
          ))}
        </Styled.Grid>
      </Styled.Container>
    </Styled.Section>
  );
};

