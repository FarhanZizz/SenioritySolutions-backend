import { z } from "zod";

const createServiceZodSchema = z.object({
  name: z.string().min(2, {
    message: "Name should be at least 2 characters long",
  }),
  imageURL: z.string().url({
    message: "Invalid image URL",
  }),
  description: z.string().min(10, {
    message: "Description should be at least 10 characters long",
  }),
  price: z.number().min(0.01, {
    message: "Price should be a positive number",
  }),
  category: z.enum(
    ["COMPANIONSHIP", "PERSONAL_CARE", "MEAL_PREPARATION", "HOUSEHOLD_CHORES"],
    {
      description: "Invalid service category",
    }
  ),
  location: z.enum(
    [
      "CHITTAGONG",
      "DHAKA",
      "SYLHET",
      "RAJSHAHI",
      "RANGPUR",
      "BARISAL",
      "KHULNA",
    ],
    {
      description: "Invalid service location",
    }
  ),
});

export const ServiceValidation = {
  createServiceZodSchema,
};
