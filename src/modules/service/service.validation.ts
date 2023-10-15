import { z } from "zod";

export const serviceSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number(),
});
