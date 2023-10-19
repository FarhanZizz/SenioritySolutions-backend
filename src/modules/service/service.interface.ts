import { Service as PrismaService } from "@prisma/client";

export interface IService extends PrismaService {}

// enum ServiceCategory {
//   COMPANIONSHIP,
//   PERSONAL_CARE,
//   MEAL_PREPARATION,
//   HOUSEHOLD_CHORES,
// }

// enum Division {
//   CHITTAGONG,
//   DHAKA,
//   SYLHET,
//   RAJSHAHI,
//   RANGPUR,
//   BARISAL,
//   KHULNA,
// }

export interface IReview {
  id?: string;
  serviceId: string;
  rating: number;
  comment: string;
  createdAt?: Date;
}

export const serviceSearchableFields = ["name", "location", "category"];

export const serviceFilterableFields = [
  "search",
  "minPrice",
  "maxPrice",
  "category",
  "location",
];

export const paginationFields = ["page", "size", "sortBy", "sortOrder"];

export type IServiceFilters = {
  search?: string;
  minPrice?: string;
  maxPrice?: string;
  category?: string;
  location?: string;
};

export type IServicePaginationOptions = {
  page?: number;
  size?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
};

export type IGenericResponse<T> = {
  meta: {
    page: number;
    size: number;
    total: number;
    totalPage: number;
  };
  data: T;
};
