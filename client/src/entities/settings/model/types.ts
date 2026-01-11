export interface FooterLink {
  label: string;
  href: string;
}

export interface SupportLink {
  label: string;
  href: string;
}

export interface Settings {
  id: string;
  sellerId?: string;
  iconUrl?: string;
  howToBuyVideoUrl?: string;
  howToBuyVideoThumbnail?: string;
  footerLinks?: FooterLink[];
  supportLinks?: SupportLink[];
  mainPageTitle?: string;
  mainPageDescription?: string;
  createdAt: string;
  updatedAt: string;
}
