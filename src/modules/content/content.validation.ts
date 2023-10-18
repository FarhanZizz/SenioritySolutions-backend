import { z } from "zod";

const BlogPostSchema = z.object({
  title: z.string().min(2, {
    message: "Title should be at least 2 characters long",
  }),
  content: z.string().min(10, {
    message: "Content should be at least 10 characters long",
  }),
  author: z.string().min(2, {
    message: "Author's name should be at least 2 characters long",
  }),
});

const FAQSchema = z.object({
  question: z.string().min(5, {
    message: "Question should be at least 5 characters long",
  }),
  answer: z.string().min(10, {
    message: "Answer should be at least 10 characters long",
  }),
});

export const contentValidation = {
  BlogPostSchema,
  FAQSchema,
};
