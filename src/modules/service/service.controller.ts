import httpStatus from "http-status";
import { serviceService } from "./service.service";
import { NextFunction, Request, Response } from "express";

const createService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const service = req.body;

    const result = await serviceService.createService(service);

    return res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message: "Service created successfully!",
      data: result,
    });
  } catch (error) {
    return next(error);
  }
};

export const serviceController = {
  createService,
};
