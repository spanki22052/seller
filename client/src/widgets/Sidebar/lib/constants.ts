import { MenuItem } from "../model/types";

export const MENU_ITEMS: MenuItem[] = [
  { id: "home", label: "Главная", isCategory: true, href: "/" },
  { id: "personal-cabinet", label: "ЛИЧНЫЙ КАБИНЕТ", isCategory: true, href: "/personal-cabinet" },
  { id: "new-releases", label: "НОВИНКИ", isCategory: true, href: "/new-releases" },
  {
    id: "arc-raiders",
    label: "ARC RAIDERS",
    cheats: [
      { id: "arc-main", name: "Смотреть главную страницу" },
      { id: "arc-crooked", name: "Crooked" },
      { id: "arc-arcane", name: "Arcane" },
      { id: "arc-dullwave", name: "Dullwave" },
      { id: "arc-ancient", name: "Ancient" },
    ],
  },
  { id: "ark", label: "ARK" },
  { id: "apex", label: "APEX" },
  {
    id: "albion-online",
    label: "ALBION ONLINE",
    cheats: [
      { id: "albion-main", name: "Смотреть главную страницу" },
      { id: "albion-pandora", name: "Pandora" },
      { id: "albion-ancient", name: "Ancient" },
      { id: "albion-dungeons-scanner", name: "Dungeons Scanner" },
      { id: "albion-avalonion", name: "Avalonian" },
      { id: "albion-byster", name: "Byster" },
    ],
  },
  { id: "arena-breakout", label: "ARENA BREAKOUT" },
  { id: "arma-reforger", label: "ARMA И ARMA REFORGER" },
  { id: "battlefield-6", label: "BATTLEFIELD 6" },
  { id: "battlefield-2042", label: "BATTLEFIELD 2042" },
  { id: "battleteams-2", label: "BATTLETEAMS 2" },
  { id: "bodycam", label: "BODYCAM" },
  { id: "cs-2", label: "CS-2" },
  { id: "call-of-duty", label: "CALL OF DUTY" },
  { id: "dune-awakening", label: "DUNE AWAKENING" },
  { id: "dayz", label: "DAYZ" },
  { id: "dead-by-daylight", label: "DEAD BY DAYLIGHT" },
  { id: "delta-force", label: "DELTA FORCE" },
  { id: "deadlock", label: "DEADLOCK" },
  { id: "dark-and-darker", label: "DARK AND DARKER" },
  { id: "deadside", label: "DEADSIDE" },
  { id: "escape-from-tarkov", label: "ESCAPE FROM TARKOV" },
  { id: "fragpunk", label: "FRAGPUNK" },
];

export const SIDEBAR_WIDTH_OPEN = 320;
export const SIDEBAR_WIDTH_CLOSED = 0;

