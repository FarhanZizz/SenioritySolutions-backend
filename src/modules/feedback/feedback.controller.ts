import httpStatus from "http-status";
import { NextFunction, Request, Response } from "express";
import { feedbackService } from "./feedback.service";

const createFeedback = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, subject, message } = req.body;
    const userId = req?.user?.id || undefined;
    const result = await feedbackService.createFeedback({ name, email, subject, message, userId });
    return res.status(httpStatus.OK).json({ success: true, statusCode: httpStatus.OK, message: "Feedback submitted successfully!", data: result });
  } catch (error) { return next(error); }
};

const getAllFeedback = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await feedbackService.getAllFeedback();
    return res.status(httpStatus.OK).json({ success: true, statusCode: httpStatus.OK, message: "Feedbacks retrieved successfully", data: result });
  } catch (error) { next(error); }
};

const deleteFeedback = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const result = await feedbackService.deleteFeedback(id);
    return res.status(httpStatus.OK).json({ success: true, statusCode: httpStatus.OK, message: "Feedback deleted successfully", data: result });
  } catch (error) { next(error); }
};

export const feedbackController = { createFeedback, getAllFeedback, deleteFeedback };
