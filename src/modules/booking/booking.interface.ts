export type IBooking = {
  id?: string;
  userId: string;
  serviceId: string;
  bookingDate: string;
  bookingTime: string;
  duration: number;
  status?: string;
  notes?: string;
  createdAt?: Date;
};
