import { Feedback } from "@prisma/client";
import { prisma } from "../../app";
import { IFeedback } from "./feedback.interface";

const createFeedback = async (feedback: IFeedback): Promise<IFeedback | null> => {
  const created = await prisma.feedback.create({ data: feedback as any });
  return created;
};

const getAllFeedback = async (): Promise<IFeedback[]> => {
  return prisma.feedback.findMany({ orderBy: { createdAt: "desc" } });
};

const deleteFeedback = async (id: string): Promise<IFeedback | null> => {
  return prisma.feedback.delete({ where: { id } });
};

export const feedbackService = { createFeedback, getAllFeedback, deleteFeedback };
