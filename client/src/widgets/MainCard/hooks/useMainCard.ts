import { useReducedMotion } from "@/shared/lib/hooks/useReducedMotion";
import { useSettings } from "@/entities/settings";
import { MainCardProps } from "../model/types";
import { MAIN_CARD_LINKS } from "../model/constants";
import { createTextVariants, createImageVariants } from "../lib/constants";

export const useMainCard = (links: MainCardProps["links"] = MAIN_CARD_LINKS) => {
  const prefersReducedMotion = useReducedMotion();
  const { data: settings } = useSettings();

  // Get support links from settings, fallback to default links
  const supportLinks = settings?.supportLinks || [];
  const techSupportLink =
    supportLinks.find(
      (link: { label: string; href: string }) =>
        link.label === "Техническая поддержка"
    )?.href || links.supportUrl;
  const adminLink =
    supportLinks.find(
      (link: { label: string; href: string }) =>
        link.label === "Связь с администратором"
    )?.href || links.adminUrl;

  const handleSupportClick = () => {
    window.open(techSupportLink, "_blank", "noopener,noreferrer");
  };

  const handleAdminClick = () => {
    window.open(adminLink, "_blank", "noopener,noreferrer");
  };

  const textVariants = createTextVariants(prefersReducedMotion);
  const imageVariants = createImageVariants(prefersReducedMotion);

  return {
    settings,
    techSupportLink,
    adminLink,
    handleSupportClick,
    handleAdminClick,
    textVariants,
    imageVariants,
  };
};
