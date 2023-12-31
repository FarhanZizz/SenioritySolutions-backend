import httpStatus from "http-status";
import { serviceService } from "./service.service";
import { NextFunction, Request, Response } from "express";
import { paginationFields, serviceFilterableFields } from "./service.interface";
import pick from "../../helpers/pick";

const createReview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const serviceId = req.params.id;
    const comment: string = req.body.comment;
    const rating: number = req.body.rating;
    const review = {
      rating,
      comment,
      serviceId,
    };

    const result = await serviceService.createReview(review);

    return res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message: "Review Posted successfully!",
      data: result,
    });
  } catch (error) {
    return next(error);
  }
};
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

const updateService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const result = await serviceService.updateService(id, updatedData);

    return res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message: "Service updated successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const singleService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const result = await serviceService.singleService(id);

    return res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message: "Service Retrived successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const deleteService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const result = await serviceService.deleteService(id);

    return res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message: "Service deleted successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getAllService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const filters = pick(req.query, serviceFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);
    const result = await serviceService.getAllService(
      filters,
      paginationOptions
    );

    return res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message: "Services retrived successfully",
      meta: {
        // Metadata
        page: result.meta.page,
        size: result.meta.size,
        total: result.meta.total,
        totalPage: result.meta.totalPage,
      },
      data: result.data, // Data
    });
  } catch (error) {
    next(error);
  }
};

export const serviceController = {
  createService,
  updateService,
  deleteService,
  getAllService,
  createReview,
  singleService,
};
