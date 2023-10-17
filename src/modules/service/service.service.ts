import { Prisma } from "@prisma/client";
import { prisma } from "../../app";
import {
  IReview,
  IService,
  IServiceFilters,
  IServicePaginationOptions,
} from "./service.interface";
import { IGenericResponse } from "../../interfaces/common";

const createReview = async (review: IReview): Promise<IReview | null> => {
  const createdReview = await prisma.review.create({
    data: review,
  });

  return createdReview;
};
const createService = async (service: IService): Promise<IService | null> => {
  const createdService = await prisma.service.create({
    data: service,
    include: {
      reviews: true,
    },
  });

  return createdService;
};

const updateService = async (
  id: string,
  payload: Partial<IService>
): Promise<IService | null> => {
  const updatedService = await prisma.service.update({
    where: {
      id,
    },
    data: payload,
    include: {
      reviews: true,
    },
  });

  return updatedService;
};

const deleteService = async (id: string): Promise<IService | null> => {
  const deletedService = await prisma.service.delete({
    where: {
      id,
    },
    include: {
      reviews: true,
    },
  });

  return deletedService;
};
const singleService = async (id: string): Promise<IService | null> => {
  const singleservice = await prisma.service.findUnique({
    where: {
      id,
    },
    include: {
      reviews: true,
    },
  });

  return singleservice;
};

const getAllService = async (
  filters: IServiceFilters,
  paginationFields: IServicePaginationOptions
): Promise<IGenericResponse<IService[]>> => {
  const query: Prisma.ServiceFindManyArgs = {};

  // Apply filters
  if (filters.search) {
    query.where = {
      OR: [
        { name: { contains: filters.search, mode: "insensitive" } },
        { location: { contains: filters.search, mode: "insensitive" } },
        { category: { contains: filters.search, mode: "insensitive" } },
      ],
    };
  }

  if (filters.minPrice !== undefined) {
    query.where = {
      ...query.where,
      price: { gte: parseInt(filters.minPrice) },
    };
  }

  if (filters.maxPrice !== undefined) {
    query.where = {
      ...query.where,
      price: { lte: parseInt(filters.maxPrice) },
    };
  }

  if (filters.category) {
    query.where = {
      ...query.where,
      category: filters.category, // Cast to enum type
    };
  }

  // Apply pagination options
  if (
    paginationFields.page !== undefined &&
    paginationFields.size !== undefined
  ) {
    query.take = paginationFields.size;
    query.skip = (paginationFields.page - 1) * paginationFields.size;
  }

  if (paginationFields.sortBy) {
    query.orderBy = {
      [paginationFields.sortBy]: paginationFields.sortOrder || "asc",
    };
  }

  const allService = await prisma.service.findMany(query);

  return {
    meta: {
      page: paginationFields.page || 1,
      size: paginationFields.size || 10,
      total: allService.length,
      totalPage: Math.ceil(allService.length / (paginationFields.size || 10)),
    },
    data: allService,
  };
};

export const serviceService = {
  createService,
  updateService,
  deleteService,
  getAllService,
  createReview,
  singleService,
};
