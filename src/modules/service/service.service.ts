import { prisma } from "../../app";
import { IService } from "./service.interface";

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

const getAllService = async (): Promise<IService[] | null> => {
  const allService = await prisma.service.findMany({
    include: {
      reviews: true,
    },
  });

  return allService;
};

export const serviceService = {
  createService,
  updateService,
  deleteService,
  getAllService,
};
