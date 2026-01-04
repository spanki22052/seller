export interface Feedback {
  id: string;
  cheatId: string;
  cheatName: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
  updatedAt: string;
}

export interface FeedbackStats {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
  averageRating: number;
}

