import { Prisma } from "@prisma/client";
import { prisma } from "../../app";
import { IReview, IService, IServiceFilters, IServicePaginationOptions } from "./service.interface";
import { IGenericResponse } from "../../interfaces/common";

const createReview = async (review: IReview): Promise<IReview | null> => {
  return prisma.review.create({ data: review as any });
};

const createService = async (service: IService): Promise<IService | null> => {
  return prisma.service.create({ data: service as any, include: { reviews: true } });
};

const updateService = async (id: string, payload: Partial<IService>): Promise<IService | null> => {
  return prisma.service.update({ where: { id }, data: payload as any, include: { reviews: true } });
};

const deleteService = async (id: string): Promise<IService | null> => {
  // Delete related reviews and bookings first to avoid FK violations
  await prisma.review.deleteMany({ where: { serviceId: id } });
  await prisma.booking.deleteMany({ where: { serviceId: id } });
  return prisma.service.delete({ where: { id } });
};

const singleService = async (id: string): Promise<IService | null> => {
  return prisma.service.findUnique({ where: { id }, include: { reviews: { orderBy: { createdAt: "desc" } } } });
};

const getAllService = async (
  filters: IServiceFilters,
  paginationFields: IServicePaginationOptions
): Promise<IGenericResponse<IService[]>> => {
  const where: Prisma.ServiceWhereInput = {};

  if (filters.search) {
    where.OR = [
      { name: { contains: filters.search, mode: "insensitive" } },
      { location: { contains: filters.search, mode: "insensitive" } },
      { category: { contains: filters.search, mode: "insensitive" } },
      { description: { contains: filters.search, mode: "insensitive" } },
    ];
  }
  if (filters.minPrice !== undefined) where.price = { ...((where.price as any) || {}), gte: parseFloat(filters.minPrice) };
  if (filters.maxPrice !== undefined) where.price = { ...((where.price as any) || {}), lte: parseFloat(filters.maxPrice) };
  if (filters.category) where.category = filters.category;
  if (filters.location) where.location = filters.location;
  if (filters.available !== undefined) where.available = filters.available === "true";

  const page = Number(paginationFields.page) || 1;
  const size = Number(paginationFields.size) || 10;
  const skip = (page - 1) * size;
  const sortBy = paginationFields.sortBy || "createdAt";
  const sortOrder = (paginationFields.sortOrder as "asc" | "desc") || "desc";

  const [total, data] = await Promise.all([
    prisma.service.count({ where }),
    prisma.service.findMany({ where, take: size, skip, orderBy: { [sortBy]: sortOrder }, include: { reviews: true } }),
  ]);

  return { meta: { page, size, total, totalPage: Math.ceil(total / size) }, data };
};

export const serviceService = { createService, updateService, deleteService, getAllService, createReview, singleService };
