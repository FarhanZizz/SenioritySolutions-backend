export interface IService {
  id: string;
  name: string;
  description: string;
  price: number;
}

export interface IReview {
  id: string;
  userId: string;
  serviceId: string;
  rating: string;
  comment: string;
  createdAt: Date;
}
