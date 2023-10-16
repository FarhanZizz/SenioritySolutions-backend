import httpStatus from "http-status";
import { NextFunction, Request, Response } from "express";
import { bookingService } from "./booking.service";

const createBooking = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { serviceId, bookingDate, bookingTime, duration, notes, status } =
      req.body;

    const booking = {
      userId: req?.user?.id,
      serviceId,
      bookingDate,
      bookingTime,
      duration,
      notes,
      status,
    };
    const result = await bookingService.createBooking(booking);
    return res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message: "Booking Posted successfully!",
      data: result,
    });
  } catch (error) {
    return next(error);
  }
};

const getAllBooking = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await bookingService.getAllBooking();

    return res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message: "Bookings retrived successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const getUserBooking = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await bookingService.getUserBooking(req.user?.id);

    return res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message: "User Bookings retrived successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const updateBooking = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const result = await bookingService.updateBooking(id, updatedData);

    return res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message: "Booking updated successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const bookingController = {
  createBooking,
  getAllBooking,
  getUserBooking,
  updateBooking,
};
