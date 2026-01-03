export interface BreadcrumbItem {
  label: string;
  href?: string;
  sectionId?: string;
}

export interface CheatDetailsData {
  productName: string;
  windowsVersion: string;
  gameVersion: string;
  gameMode: string;
  processors: string;
  buttonText: string;
  breadcrumbs: BreadcrumbItem[];
  videoUrl?: string;
  videoThumbnail?: string;
}

