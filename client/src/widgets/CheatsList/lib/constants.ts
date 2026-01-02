import { Cheat } from "../model/types";

export const cheats: Cheat[] = [
  {
    id: "btg",
    name: "BTG",
    image: "/images/cheats/btg.png",
    price: { amount: 170, currency: "RUB" },
  },
  {
    id: "warchill",
    name: "WARCHILL",
    image: "/images/cheats/warchill.png",
    price: { amount: 5, currency: "USD" },
  },
  {
    id: "dullwave",
    name: "DULLWAVE",
    image: "/images/cheats/dullwave.png",
    price: { amount: 190, currency: "RUB" },
  },
  {
    id: "ancient",
    name: "ANCIENT",
    image: "/images/cheats/ancient.png",
    price: { amount: 3, currency: "USD" },
  },
  {
    id: "makros",
    name: "МАКРОС",
    image: "/images/cheats/makros.png",
    price: { amount: 99, currency: "RUB" },
  },
  {
    id: "covcheg",
    name: "COVCHEG",
    image: "/images/cheats/covcheg.png",
    price: { amount: 269, currency: "RUB" },
  },
  {
    id: "arcane",
    name: "ARCANE",
    image: "/images/cheats/arcane.png",
    price: { amount: 400, currency: "RUB" },
    isNew: true,
  },
  {
    id: "soon-1",
    name: "СКОРО",
    image: "/images/cheats/soon-1.png",
    price: { amount: null, currency: "RUB" },
    isComingSoon: true,
  },
  {
    id: "soon-2",
    name: "СКОРО",
    image: "/images/cheats/soon-2.png",
    price: { amount: null, currency: "RUB" },
    isComingSoon: true,
  },
];

