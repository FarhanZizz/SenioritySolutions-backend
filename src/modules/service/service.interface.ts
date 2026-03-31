export type IService = {
  id?: string;
  name: string;
  description: string;
  price: number;
  available?: boolean;
  category?: string;
  location?: string;
  imageUrl?: string;
};

export type IReview = {
  id?: string;
  serviceId: string;
  userId?: string;
  userName?: string;
  rating: number;
  comment: string;
};

export type IServiceFilters = {
  search?: string;
  minPrice?: string;
  maxPrice?: string;
  category?: string;
  location?: string;
  available?: string;
};

export type IServicePaginationOptions = {
  page?: number;
  size?: number;
  sortBy?: string;
  sortOrder?: string;
};

export const serviceFilterableFields = ["search", "minPrice", "maxPrice", "category", "location", "available"];
export const paginationFields = ["page", "size", "sortBy", "sortOrder"];
