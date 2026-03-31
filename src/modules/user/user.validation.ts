import { z } from "zod";

const createUserZodSchema = z.object({
  body: z.object({
    password: z.string().min(8, { message: "Password should be at least 8 characters long" }),
    name: z.string().min(2, { message: "Name should be at least 2 characters long" }),
    email: z.string().email({ message: "Invalid email format" }),
    phone: z.string().min(10, { message: "Phone number should be at least 10 digits" }),
  }),
});

export const UserValidation = { createUserZodSchema };
