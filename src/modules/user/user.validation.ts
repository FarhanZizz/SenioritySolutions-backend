import { z } from "zod";

const createUserZodSchema = z.object({
  password: z.string().min(8, {
    message: "Password should be at least 8 characters long",
  }),
  name: z.string().min(2, {
    message: "Name should be at least 2 characters long",
  }),
  email: z.string().email({
    message: "Invalid email format",
  }),
  phone: z.number().refine(
    (value) => /^\d{10}$/.test(value.toString()), // Ensure it's a 10-digit number
    {
      message: "Phone number should be a 10-digit number",
    }
  ),
});

export const UserValidation = {
  createUserZodSchema,
};
