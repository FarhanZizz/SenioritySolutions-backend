import { prisma } from "../../app";
import { BlogPost, FAQ } from "@prisma/client";

const createFaq = async (faq: FAQ): Promise<FAQ | null> => {
  const createdFaq = await prisma.fAQ.create({
    data: faq,
  });

  return createdFaq;
};
const deleteFaq = async (id: string): Promise<FAQ | null> => {
  const deletedFaq = await prisma.fAQ.delete({
    where: {
      id,
    },
  });

  return deletedFaq;
};

const getAllFaq = async (): Promise<FAQ[]> => {
  const allFaq = await prisma.fAQ.findMany();

  return allFaq;
};

const updateFaq = async (
  id: string,
  payload: Partial<FAQ>
): Promise<FAQ | null> => {
  const updatedFaq = await prisma.fAQ.update({
    where: {
      id,
    },
    data: payload,
  });

  return updatedFaq;
};

const createBlogPost = async (post: BlogPost): Promise<BlogPost | null> => {
  const createdPost = await prisma.blogPost.create({
    data: post,
  });

  return createdPost;
};

const getAllBlogs = async (): Promise<BlogPost[]> => {
  const allBlogs = await prisma.blogPost.findMany();

  return allBlogs;
};

const deleteBlog = async (id: string): Promise<BlogPost | null> => {
  const deletedBlog = await prisma.blogPost.delete({
    where: {
      id,
    },
  });

  return deletedBlog;
};

const updateBlog = async (
  id: string,
  payload: Partial<BlogPost>
): Promise<BlogPost | null> => {
  const updatedBlog = await prisma.blogPost.update({
    where: {
      id,
    },
    data: payload,
  });

  return updatedBlog;
};

export const contentService = {
  createBlogPost,
  getAllBlogs,
  deleteBlog,
  updateBlog,
  createFaq,
  deleteFaq,
  updateFaq,
  getAllFaq,
};
