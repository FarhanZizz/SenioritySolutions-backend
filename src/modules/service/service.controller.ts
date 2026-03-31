import httpStatus from "http-status";
import { serviceService } from "./service.service";
import { NextFunction, Request, Response } from "express";
import { paginationFields, serviceFilterableFields } from "./service.interface";
import pick from "../../helpers/pick";

const createReview = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const serviceId = req.params.id;
    const { comment, rating } = req.body;
    const userId = req?.user?.id;
    const review = { rating: Number(rating), comment, serviceId, userId };
    const result = await serviceService.createReview(review);
    return res.status(httpStatus.OK).json({ success: true, statusCode: httpStatus.OK, message: "Review posted successfully!", data: result });
  } catch (error) { return next(error); }
};

const createService = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await serviceService.createService(req.body);
    return res.status(httpStatus.OK).json({ success: true, statusCode: httpStatus.OK, message: "Service created successfully!", data: result });
  } catch (error) { return next(error); }
};

const updateService = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await serviceService.updateService(req.params.id, req.body);
    return res.status(httpStatus.OK).json({ success: true, statusCode: httpStatus.OK, message: "Service updated successfully", data: result });
  } catch (error) { next(error); }
};

const singleService = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await serviceService.singleService(req.params.id);
    if (!result) return res.status(httpStatus.NOT_FOUND).json({ success: false, statusCode: httpStatus.NOT_FOUND, message: "Service not found" });
    return res.status(httpStatus.OK).json({ success: true, statusCode: httpStatus.OK, message: "Service retrieved successfully", data: result });
  } catch (error) { next(error); }
};

const deleteService = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await serviceService.deleteService(req.params.id);
    return res.status(httpStatus.OK).json({ success: true, statusCode: httpStatus.OK, message: "Service deleted successfully", data: result });
  } catch (error) { next(error); }
};

const getAllService = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const filters = pick(req.query, serviceFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);
    const result = await serviceService.getAllService(filters, paginationOptions);
    return res.status(httpStatus.OK).json({ success: true, statusCode: httpStatus.OK, message: "Services retrieved successfully", meta: result.meta, data: result.data });
  } catch (error) { next(error); }
};

export const serviceController = { createService, updateService, deleteService, getAllService, createReview, singleService };
