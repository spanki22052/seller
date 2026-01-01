export interface Cheat {
  name: string;
  description?: string;
}

export interface Game {
  name: string;
  icon: string;
  cheats: Cheat[];
}

export interface MenuItem {
  icon: string;
  text: string;
  href: string;
  hasDropdown: boolean;
}

export interface Language {
  code: string;
  label: string;
}

export const games: Game[] = [
  {
    name: "Dayz",
    icon: "sports_esports",
    cheats: [
      { name: "ESP", description: "See players through walls" },
      { name: "Aimbot", description: "Automatic aiming" },
      { name: "No Recoil", description: "Remove weapon recoil" },
      { name: "Speed Hack", description: "Increase movement speed" },
    ],
  },
  {
    name: "Rust",
    icon: "sports_esports",
    cheats: [
      { name: "ESP", description: "See players and resources" },
      { name: "Aimbot", description: "Perfect aim assistance" },
      { name: "Fly Hack", description: "Fly around the map" },
      { name: "Resource ESP", description: "See all resources" },
    ],
  },
  {
    name: "Apex",
    icon: "sports_esports",
    cheats: [
      { name: "ESP", description: "See enemies through walls" },
      { name: "Aimbot", description: "Auto aim for headshots" },
      { name: "No Recoil", description: "Remove weapon spread" },
      { name: "Speed Hack", description: "Faster movement" },
    ],
  },
  {
    name: "Squad",
    icon: "sports_esports",
    cheats: [
      { name: "ESP", description: "See all players" },
      { name: "Aimbot", description: "Precise aiming" },
      { name: "No Recoil", description: "Zero weapon recoil" },
      { name: "Radar Hack", description: "Mini-map enhancement" },
    ],
  },
  {
    name: "Path of Exile 2",
    icon: "sports_esports",
    cheats: [
      { name: "Auto Pickup", description: "Auto collect items" },
      { name: "ESP", description: "See items and enemies" },
      { name: "Speed Hack", description: "Faster movement" },
      { name: "Damage Modifier", description: "Increase damage" },
    ],
  },
  {
    name: "World of Warcraft",
    icon: "sports_esports",
    cheats: [
      { name: "Bot", description: "Automated gameplay" },
      { name: "ESP", description: "See NPCs and players" },
      { name: "Speed Hack", description: "Faster movement" },
      { name: "Teleport", description: "Instant teleportation" },
    ],
  },
  {
    name: "Counter-Strike 2",
    icon: "sports_esports",
    cheats: [
      { name: "ESP", description: "See enemies through walls" },
      { name: "Aimbot", description: "Perfect aim" },
      { name: "Wallhack", description: "See through walls" },
      { name: "Bhop", description: "Bunny hop script" },
    ],
  },
  {
    name: "Valorant",
    icon: "sports_esports",
    cheats: [
      { name: "ESP", description: "See enemies" },
      { name: "Aimbot", description: "Auto aim" },
      { name: "No Recoil", description: "Remove recoil" },
      { name: "Radar Hack", description: "Mini-map ESP" },
    ],
  },
  {
    name: "Fortnite",
    icon: "sports_esports",
    cheats: [
      { name: "ESP", description: "See players and loot" },
      { name: "Aimbot", description: "Auto aim" },
      { name: "No Recoil", description: "Remove spread" },
      { name: "Speed Hack", description: "Faster movement" },
    ],
  },
  {
    name: "Call of Duty",
    icon: "sports_esports",
    cheats: [
      { name: "ESP", description: "See enemies" },
      { name: "Aimbot", description: "Perfect aim" },
      { name: "No Recoil", description: "Zero recoil" },
      { name: "Wallhack", description: "See through walls" },
    ],
  },
];

export const languages: Language[] = [
  { code: "ru", label: "RU" },
  { code: "en", label: "EN" },
];
