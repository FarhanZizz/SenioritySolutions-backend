import { z } from "zod";

const createFeedbackZodSchema = z.object({
  body: z.object({
    name: z.string().min(2),
    email: z.string().email(),
    subject: z.string().min(3),
    message: z.string().min(10),
  }),
});

export const FeedbackValidation = { createFeedbackZodSchema };
