export interface IService {
  id: string;
  name: string;
  description: string;
  price: number;
}

export interface IReview {
  id?: string;
  userId: string;
  serviceId: string;
  rating: number;
  comment: string;
  createdAt?: Date;
}
