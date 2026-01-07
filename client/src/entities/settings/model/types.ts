export interface FooterLink {
  label: string;
  href: string;
}

export interface Settings {
  id: string;
  howToBuyVideoUrl?: string;
  howToBuyVideoThumbnail?: string;
  footerLinks?: FooterLink[];
  createdAt: string;
  updatedAt: string;
}
