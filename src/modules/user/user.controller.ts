import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { UserService } from "./user.service";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await UserService.createUser(req.body);
    return res.status(httpStatus.OK).json({ success: true, statusCode: httpStatus.OK, message: "User created successfully!", data: result });
  } catch (error) { return next(error); }
};

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await UserService.loginUser(req.body);
    return res.status(httpStatus.OK).json({ success: true, statusCode: httpStatus.OK, message: "User Logged In successfully!", token: result });
  } catch (error) { return next(error); }
};

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await UserService.getAllUsers();
    return res.status(httpStatus.OK).json({ success: true, statusCode: httpStatus.OK, message: "Users retrieved successfully", data: result });
  } catch (error) { next(error); }
};

const getSingleUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await UserService.getSingleUser(req.params.id);
    return res.status(httpStatus.OK).json({ success: true, statusCode: httpStatus.OK, message: "User retrieved successfully", data: result });
  } catch (error) { next(error); }
};

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await UserService.updateUser(req.params.id, req.body);
    return res.status(httpStatus.OK).json({ success: true, statusCode: httpStatus.OK, message: "User updated successfully", data: result });
  } catch (error) { next(error); }
};

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await UserService.deleteUser(req.params.id);
    return res.status(httpStatus.OK).json({ success: true, statusCode: httpStatus.OK, message: "User deleted successfully", data: result });
  } catch (error) { next(error); }
};

const getProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await UserService.getSingleUser(req?.user?.id);
    return res.status(httpStatus.OK).json({ success: true, statusCode: httpStatus.OK, message: "Profile retrieved successfully", data: result });
  } catch (error) { next(error); }
};

const changeRole = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { role } = req.body;
    const result = await UserService.changeRole(req.params.id, role);
    return res.status(httpStatus.OK).json({ success: true, statusCode: httpStatus.OK, message: "Role updated successfully", data: result });
  } catch (error) { next(error); }
};

export const UserController = { createUser, loginUser, getAllUsers, getSingleUser, updateUser, deleteUser, getProfile, changeRole };
