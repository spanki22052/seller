export type CheatStatus = "undetected" | "maintenance" | "detected" | "new";

export interface CheatCard {
  id: string;
  name: string;
  version: string;
  description: string;
  image: string;
  status: CheatStatus;
  updated: string;
  isUnsafe?: boolean;
}

