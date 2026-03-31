export type IFeedback = {
  id?: string;
  userId?: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt?: Date;
};
