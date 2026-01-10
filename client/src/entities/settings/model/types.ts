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
  howToBuyVideoUrl?: string;
  howToBuyVideoThumbnail?: string;
  footerLinks?: FooterLink[];
  supportLinks?: SupportLink[];
  createdAt: string;
  updatedAt: string;
}
