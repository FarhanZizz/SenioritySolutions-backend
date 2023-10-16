import { prisma } from "../../app";
import { IBooking } from "./booking.interface";

const createBooking = async (booking: IBooking): Promise<IBooking | null> => {
  const createdBooking = await prisma.booking.create({
    data: booking,
  });

  return createdBooking;
};

const getAllBooking = async (): Promise<IBooking[] | null> => {
  const bookingsWithDetails = await prisma.booking.findMany({
    include: {
      service: true,
      user: true,
    },
  });

  return bookingsWithDetails;
};
const getUserBooking = async (userId: string): Promise<IBooking[] | null> => {
  const bookingsWithDetails = await prisma.booking.findMany({
    where: { userId },
    include: {
      service: true,
      user: true,
    },
  });

  return bookingsWithDetails;
};

const updateBooking = async (
  id: string,
  payload: Partial<IBooking>
): Promise<IBooking | null> => {
  const updatedBooking = await prisma.booking.update({
    where: {
      id,
    },
    data: payload,
  });

  return updatedBooking;
};

export const bookingService = {
  createBooking,
  getAllBooking,
  getUserBooking,
  updateBooking,
};
