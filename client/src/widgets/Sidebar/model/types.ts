export interface Cheat {
  id: string;
  name: string;
  href?: string;
}

export interface HomeLink {
  id: string;
  title: string;
  url: string;
  description?: string;
}

export interface MenuItem {
  id: string;
  label: string;
  href?: string;
  cheats?: Cheat[];
  homeLinks?: HomeLink[];
  isCategory?: boolean;
}

