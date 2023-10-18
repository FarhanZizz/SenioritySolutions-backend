import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { contentService } from "./content.service";

const createBlogPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const post = req.body;

    const result = await contentService.createBlogPost(post);

    return res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message: "Post created successfully!",
      data: result,
    });
  } catch (error) {
    return next(error);
  }
};

const getAllBlogs = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await contentService.getAllBlogs();

    return res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message: "Blogs retrieved successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const updateBlog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const result = await contentService.updateBlog(id, updatedData);

    return res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message: "Blog updated successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const deleteBlog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const result = await contentService.deleteBlog(id);

    return res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message: "Blog deleted successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const createFaq = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const faq = req.body;

    const result = await contentService.createFaq(faq);

    return res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message: "FAQ created successfully!",
      data: result,
    });
  } catch (error) {
    return next(error);
  }
};

const getAllFaq = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await contentService.getAllFaq();

    return res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message: "FAQS retrieved successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const updateFaq = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const result = await contentService.updateFaq(id, updatedData);

    return res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message: "FAQ updated successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const deleteFaq = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const result = await contentService.deleteFaq(id);

    return res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message: "FAQ deleted successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const contentController = {
  createBlogPost,
  getAllBlogs,
  updateBlog,
  deleteBlog,
  createFaq,
  updateFaq,
  deleteFaq,
  getAllFaq,
};
