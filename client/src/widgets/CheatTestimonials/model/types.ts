export interface Testimonial {
  id: string;
  name: string;
  avatar?: string;
  rating: number;
  text: string;
  comment?: string;
  date: string;
  game?: string;
}

export interface DigisellerReview {
  id: number;
  invoice_id: number;
  owner_id: number;
  type: "good" | "bad";
  date: string;
  dateUtc: string;
  info: string;
  comment?: string;
  dateComment?: string;
  dateCommentUtc?: string;
}

export interface DigisellerReviewsResponse {
  retval: number;
  retdesc: string;
  totalPages: number;
  totalItems: number;
  totalGood: number;
  totalBad: number;
  review: DigisellerReview[];
}
