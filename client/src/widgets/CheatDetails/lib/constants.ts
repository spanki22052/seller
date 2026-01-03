import { CheatDetailsData } from "../model/types";

export const cheatDetailsData: Record<string, CheatDetailsData> = {
  default: {
    productName: "CFFHOOK",
    windowsVersion: "Windows 10-11 [1909-23H2]",
    gameVersion: "Steam",
    gameMode: "Оконный",
    processors: "Intel и AMD",
    buttonText: "ОТЗЫВЫ",
    breadcrumbs: [
      { label: "Скриншоты", sectionId: "screenshots" },
      { label: "Функционал", sectionId: "functions" },
      { label: "Купить сейчас", sectionId: "pricing" },
      { label: "Игровые аккаунты", sectionId: "accounts" },
      { label: "Видео как купить", sectionId: "video" },
    ],
  },
};

