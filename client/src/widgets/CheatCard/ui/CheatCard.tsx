"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import type { CheatCard as CheatCardType } from "@/widgets/CheatCards/mocks/mock";
import * as Styled from "./styled";

interface CheatCardProps {
  cheat: CheatCardType;
  index: number;
}

export const CheatCard = ({ cheat, index }: CheatCardProps) => {
  const { t } = useTranslation();
  const router = useRouter();

  const handleClick = () => {
    router.push(`/product?id=${cheat.id}`);
  };

  const getStatusConfig = () => {
    switch (cheat.status) {
      case "undetected":
        return {
          label: t("explore.status.undetected"),
          bgColor: "rgba(34, 197, 94, 0.1)",
          textColor: "rgba(34, 197, 94, 1)",
          borderColor: "rgba(34, 197, 94, 0.2)",
          dotColor: "rgba(34, 197, 94, 1)",
        };
      case "maintenance":
        return {
          label: t("explore.status.maintenance"),
          bgColor: "rgba(234, 179, 8, 0.1)",
          textColor: "rgba(234, 179, 8, 1)",
          borderColor: "rgba(234, 179, 8, 0.2)",
          dotColor: "rgba(234, 179, 8, 1)",
        };
      case "detected":
        return {
          label: t("explore.status.detected"),
          bgColor: "rgba(239, 68, 68, 0.1)",
          textColor: "rgba(239, 68, 68, 1)",
          borderColor: "rgba(239, 68, 68, 0.2)",
          dotColor: "rgba(239, 68, 68, 1)",
        };
      case "new":
        return {
          label: t("explore.status.new"),
          bgColor: "rgba(127, 19, 236, 0.1)",
          textColor: "var(--color-primary)",
          borderColor: "rgba(127, 19, 236, 0.2)",
          dotColor: "var(--color-primary)",
        };
      default:
        return {
          label: "",
          bgColor: "transparent",
          textColor: "var(--text-primary)",
          borderColor: "transparent",
          dotColor: "transparent",
        };
    }
  };

  const statusConfig = getStatusConfig();

  const getUpdatedText = () => {
    let unitKey = `explore.timeUnits.${cheat.updatedUnit}`;
    // Handle plural for weeks
    if (cheat.updatedUnit === "weeks") {
      unitKey =
        cheat.updatedValue > 1
          ? "explore.timeUnits.weeksPlural"
          : "explore.timeUnits.weeks";
    }
    const unit = t(unitKey);
    // Add space for "week" units, no space for short units (m, h, d)
    const separator = cheat.updatedUnit === "weeks" ? " " : "";
    return `${cheat.updatedValue}${separator}${unit}`;
  };

  return (
    <Styled.Card
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.1,
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -4 }}
    >
      <Styled.ImageContainer>
        <Styled.BadgesContainer>
          <Styled.StatusBadge
            $bgColor={statusConfig.bgColor}
            $textColor={statusConfig.textColor}
            $borderColor={statusConfig.borderColor}
          >
            <Styled.StatusDot $color={statusConfig.dotColor} />
            {statusConfig.label}
          </Styled.StatusBadge>
          {cheat.status === "new" && (
            <Styled.NewBadge>
              {t("explore.status.new")}
            </Styled.NewBadge>
          )}
        </Styled.BadgesContainer>
        <Styled.ImageWrapper>
          <Image
            src={cheat.image}
            alt={t(cheat.nameKey)}
            fill
            style={{
              objectFit: "cover",
            }}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </Styled.ImageWrapper>
        <Styled.ImageOverlay />
      </Styled.ImageContainer>
      <Styled.Content>
        <Styled.Header>
          <Styled.Title>{t(cheat.nameKey)}</Styled.Title>
          <Styled.Version>{cheat.version}</Styled.Version>
        </Styled.Header>
        <Styled.Description>{t(cheat.descriptionKey)}</Styled.Description>
        <Styled.Footer>
          <Styled.UpdatedInfo>
            <Styled.UpdateIcon>update</Styled.UpdateIcon>
            {getUpdatedText()} {t("explore.updated")}
          </Styled.UpdatedInfo>
          {cheat.isUnsafe ? (
            <Styled.UnsafeButton disabled>
              {t("explore.unsafe")}
              <Styled.WarningIcon>warning</Styled.WarningIcon>
            </Styled.UnsafeButton>
          ) : (
            <Styled.ViewButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleClick}
            >
              {t("explore.viewDetails")}
              <Styled.ArrowIcon>arrow_forward</Styled.ArrowIcon>
            </Styled.ViewButton>
          )}
        </Styled.Footer>
      </Styled.Content>
    </Styled.Card>
  );
};

