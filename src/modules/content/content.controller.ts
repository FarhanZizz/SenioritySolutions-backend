import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { contentService } from "./content.service";

const createBlogPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await contentService.createBlogPost(req.body);
    return res.status(httpStatus.OK).json({ success: true, statusCode: httpStatus.OK, message: "Post created successfully!", data: result });
  } catch (error) { return next(error); }
};
const getAllBlogs = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await contentService.getAllBlogs();
    return res.status(httpStatus.OK).json({ success: true, statusCode: httpStatus.OK, message: "Blogs retrieved successfully", data: result });
  } catch (error) { next(error); }
};
const getSingleBlog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await contentService.getSingleBlog(req.params.id);
    if (!result) return res.status(httpStatus.NOT_FOUND).json({ success: false, message: "Blog post not found" });
    return res.status(httpStatus.OK).json({ success: true, statusCode: httpStatus.OK, message: "Blog retrieved successfully", data: result });
  } catch (error) { next(error); }
};
const updateBlog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await contentService.updateBlog(req.params.id, req.body);
    return res.status(httpStatus.OK).json({ success: true, statusCode: httpStatus.OK, message: "Blog updated successfully", data: result });
  } catch (error) { next(error); }
};
const deleteBlog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await contentService.deleteBlog(req.params.id);
    return res.status(httpStatus.OK).json({ success: true, statusCode: httpStatus.OK, message: "Blog deleted successfully", data: result });
  } catch (error) { next(error); }
};
const createFaq = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await contentService.createFaq(req.body);
    return res.status(httpStatus.OK).json({ success: true, statusCode: httpStatus.OK, message: "FAQ created successfully!", data: result });
  } catch (error) { return next(error); }
};
const getAllFaq = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await contentService.getAllFaq();
    return res.status(httpStatus.OK).json({ success: true, statusCode: httpStatus.OK, message: "FAQs retrieved successfully", data: result });
  } catch (error) { next(error); }
};
const updateFaq = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await contentService.updateFaq(req.params.id, req.body);
    return res.status(httpStatus.OK).json({ success: true, statusCode: httpStatus.OK, message: "FAQ updated successfully", data: result });
  } catch (error) { next(error); }
};
const deleteFaq = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await contentService.deleteFaq(req.params.id);
    return res.status(httpStatus.OK).json({ success: true, statusCode: httpStatus.OK, message: "FAQ deleted successfully", data: result });
  } catch (error) { next(error); }
};

export const contentController = { createBlogPost, getAllBlogs, getSingleBlog, updateBlog, deleteBlog, createFaq, updateFaq, deleteFaq, getAllFaq };
