export interface Cheat {
  id: string;
  name: string;
  href?: string;
}

export interface MenuItem {
  id: string;
  label: string;
  href?: string;
  cheats?: Cheat[];
  isCategory?: boolean;
}

