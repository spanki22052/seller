export interface Faq {
  id: string;
  question: string;
  answer: string;
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateFaqDto {
  question: string;
  answer: string;
  isActive?: boolean;
  sortOrder?: number;
}

export interface UpdateFaqDto {
  question?: string;
  answer?: string;
  isActive?: boolean;
  sortOrder?: number;
}
