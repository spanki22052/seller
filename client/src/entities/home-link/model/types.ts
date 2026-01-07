export interface HomeLink {
  id: string;
  title: string;
  url: string;
  description?: string;
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateHomeLinkDto {
  title: string;
  url: string;
  description?: string;
  isActive?: boolean;
  sortOrder?: number;
}

export interface UpdateHomeLinkDto {
  title?: string;
  url?: string;
  description?: string;
  isActive?: boolean;
  sortOrder?: number;
}
