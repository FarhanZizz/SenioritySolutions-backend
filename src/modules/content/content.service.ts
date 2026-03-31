import { prisma } from "../../app";
import { BlogPost, FAQ } from "@prisma/client";

const createFaq = async (faq: Omit<FAQ, "id" | "createdAt">): Promise<FAQ> => {
  return prisma.fAQ.create({ data: faq });
};
const deleteFaq = async (id: string): Promise<FAQ> => {
  return prisma.fAQ.delete({ where: { id } });
};
const getAllFaq = async (): Promise<FAQ[]> => {
  return prisma.fAQ.findMany({ orderBy: { createdAt: "desc" } });
};
const updateFaq = async (id: string, payload: Partial<FAQ>): Promise<FAQ> => {
  return prisma.fAQ.update({ where: { id }, data: payload });
};

const createBlogPost = async (post: Omit<BlogPost, "id" | "createdAt">): Promise<BlogPost> => {
  return prisma.blogPost.create({ data: post });
};
const getAllBlogs = async (): Promise<BlogPost[]> => {
  return prisma.blogPost.findMany({ orderBy: { createdAt: "desc" } });
};
const getSingleBlog = async (id: string): Promise<BlogPost | null> => {
  return prisma.blogPost.findUnique({ where: { id } });
};
const deleteBlog = async (id: string): Promise<BlogPost> => {
  return prisma.blogPost.delete({ where: { id } });
};
const updateBlog = async (id: string, payload: Partial<BlogPost>): Promise<BlogPost> => {
  return prisma.blogPost.update({ where: { id }, data: payload });
};

export const contentService = { createBlogPost, getAllBlogs, getSingleBlog, deleteBlog, updateBlog, createFaq, deleteFaq, updateFaq, getAllFaq };
