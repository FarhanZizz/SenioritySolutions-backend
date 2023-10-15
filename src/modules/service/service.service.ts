import { prisma } from "../../app";
import { IService } from "./service.interface";

const createService = async (service: IService): Promise<IService | null> => {
  const createdService = await prisma.service.create({
    data: service,
  });

  return createdService;
};

export const serviceService = {
  createService,
};
