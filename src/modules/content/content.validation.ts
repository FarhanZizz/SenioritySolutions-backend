import { z } from "zod";

const BlogPostSchema = z.object({
  body: z.object({
    title: z.string().min(3, { message: "Title must be at least 3 characters" }),
    content: z.string().min(20, { message: "Content must be at least 20 characters" }),
    author: z.string().min(2, { message: "Author must be at least 2 characters" }),
    imageUrl: z.string().url().optional().or(z.literal("")),
  }),
});

const FAQSchema = z.object({
  body: z.object({
    question: z.string().min(5, { message: "Question must be at least 5 characters" }),
    answer: z.string().min(10, { message: "Answer must be at least 10 characters" }),
  }),
});

export const contentValidation = { BlogPostSchema, FAQSchema };
