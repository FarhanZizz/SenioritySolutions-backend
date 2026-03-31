import { prisma } from "../../app";
import { IBooking } from "./booking.interface";

const createBooking = async (booking: IBooking): Promise<IBooking | null> => {
  return prisma.booking.create({ data: booking as any, include: { service: true, user: { select: { id: true, name: true, email: true } } } });
};

const getAllBooking = async (): Promise<IBooking[]> => {
  return prisma.booking.findMany({ include: { service: true, user: { select: { id: true, name: true, email: true, phone: true } } }, orderBy: { createdAt: "desc" } }) as any;
};

const getUserBooking = async (userId: string): Promise<IBooking[]> => {
  return prisma.booking.findMany({ where: { userId }, include: { service: true, user: { select: { id: true, name: true, email: true } } }, orderBy: { createdAt: "desc" } }) as any;
};

const updateBooking = async (id: string, payload: Partial<IBooking>): Promise<IBooking | null> => {
  return prisma.booking.update({ where: { id }, data: payload as any, include: { service: true } });
};

const cancelBooking = async (id: string, userId: string): Promise<IBooking | null> => {
  const booking = await prisma.booking.findUnique({ where: { id } });
  if (!booking || booking.userId !== userId) throw new Error("Booking not found or unauthorized");
  return prisma.booking.update({ where: { id }, data: { status: "cancelled" } as any });
};

const deleteBooking = async (id: string): Promise<IBooking | null> => {
  return prisma.booking.delete({ where: { id } });
};

export const bookingService = { createBooking, getAllBooking, getUserBooking, updateBooking, cancelBooking, deleteBooking };
