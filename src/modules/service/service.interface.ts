export interface IService {
  id: string;
  name: string;
  description: string;
  price: number;
  // reviews?: IReview[]; // Array of reviews
}

export interface IReview {
  id: number;
  userId: number;
  serviceId: number;
  rating: number;
  comment: string;
  createdAt: Date;
}
