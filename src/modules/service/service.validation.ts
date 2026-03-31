import { z } from "zod";

const createServiceZodSchema = z.object({
  body: z.object({
    name: z.string().min(2, { message: "Name should be at least 2 characters long" }),
    description: z.string().min(10, { message: "Description should be at least 10 characters long" }),
    price: z.number().min(0.01, { message: "Price should be a positive number" }),
    category: z.enum(["COMPANIONSHIP", "PERSONAL_CARE", "MEAL_PREPARATION", "HOUSEHOLD_CHORES"]).optional(),
    location: z.enum(["CHITTAGONG", "DHAKA", "SYLHET", "RAJSHAHI", "RANGPUR", "BARISAL", "KHULNA"]).optional(),
    imageUrl: z.string().url().optional().or(z.literal("")),
    available: z.boolean().optional(),
  }),
});

const updateServiceZodSchema = z.object({
  body: z.object({
    name: z.string().min(2).optional(),
    description: z.string().min(10).optional(),
    price: z.number().min(0.01).optional(),
    category: z.enum(["COMPANIONSHIP", "PERSONAL_CARE", "MEAL_PREPARATION", "HOUSEHOLD_CHORES"]).optional(),
    location: z.enum(["CHITTAGONG", "DHAKA", "SYLHET", "RAJSHAHI", "RANGPUR", "BARISAL", "KHULNA"]).optional(),
    imageUrl: z.string().url().optional().or(z.literal("")),
    available: z.boolean().optional(),
  }),
});

export const ServiceValidation = { createServiceZodSchema, updateServiceZodSchema };
