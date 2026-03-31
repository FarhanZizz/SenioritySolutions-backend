import httpStatus from "http-status";
import { NextFunction, Request, Response } from "express";
import { bookingService } from "./booking.service";

const createBooking = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { serviceId, bookingDate, bookingTime, duration, notes } = req.body;
    const booking = { userId: req?.user?.id, serviceId, bookingDate, bookingTime, duration, notes, status: "pending" };
    const result = await bookingService.createBooking(booking as any);
    return res.status(httpStatus.OK).json({ success: true, statusCode: httpStatus.OK, message: "Booking created successfully!", data: result });
  } catch (error) { return next(error); }
};

const getAllBooking = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await bookingService.getAllBooking();
    return res.status(httpStatus.OK).json({ success: true, statusCode: httpStatus.OK, message: "Bookings retrieved successfully", data: result });
  } catch (error) { next(error); }
};

const getUserBooking = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await bookingService.getUserBooking(req.user?.id);
    return res.status(httpStatus.OK).json({ success: true, statusCode: httpStatus.OK, message: "User Bookings retrieved successfully", data: result });
  } catch (error) { next(error); }
};

const updateBooking = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await bookingService.updateBooking(req.params.id, req.body);
    return res.status(httpStatus.OK).json({ success: true, statusCode: httpStatus.OK, message: "Booking updated successfully", data: result });
  } catch (error) { next(error); }
};

const cancelBooking = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await bookingService.cancelBooking(req.params.id, req.user?.id);
    return res.status(httpStatus.OK).json({ success: true, statusCode: httpStatus.OK, message: "Booking cancelled successfully", data: result });
  } catch (error) { next(error); }
};

const deleteBooking = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await bookingService.deleteBooking(req.params.id);
    return res.status(httpStatus.OK).json({ success: true, statusCode: httpStatus.OK, message: "Booking deleted successfully", data: result });
  } catch (error) { next(error); }
};

export const bookingController = { createBooking, getAllBooking, getUserBooking, updateBooking, cancelBooking, deleteBooking };
