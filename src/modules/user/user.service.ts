import httpStatus from "http-status";
import jwt, { Secret } from "jsonwebtoken";
import { prisma } from "../../app";
import config from "../../config";
import ApiError from "../../errors/ApiError";
import { ILoginUser, IUser } from "./user.interface";

const createUser = async (user: IUser): Promise<IUser | null> => {
  const createdUser = await prisma.user.create({
    data: user,
  });

  return createdUser;
};

const loginUser = async (payload: ILoginUser): Promise<string> => {
  const { email, password } = payload;

  // Find the user using Prisma
  const user = await prisma.user.findUnique({
    where: { email },
    select: { id: true, role: true, password: true },
  });

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User does not exist");
  }

  // Verify the password

  if (user.password !== password) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Password is incorrect");
  }

  // Create an access token
  const { id, role } = user;
  const token = jwt.sign({ id, role }, config.jwt.secret as Secret, {
    expiresIn: config.jwt.expires_in,
  });

  return token;
};

const getAllUsers = async (): Promise<IUser[]> => {
  const allUsers = await prisma.user.findMany();

  return allUsers;
};

const getSingleUser = async (id: string): Promise<IUser | null> => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  return user;
};

const updateUser = async (
  id: string,
  payload: Partial<IUser>
): Promise<IUser | null> => {
  const updatedUser = await prisma.user.update({
    where: {
      id,
    },
    data: payload,
  });

  return updatedUser;
};

const deleteUser = async (id: string): Promise<IUser | null> => {
  const deletedUser = await prisma.user.delete({
    where: {
      id,
    },
  });

  return deletedUser;
};

export const UserService = {
  createUser,
  loginUser,
  getAllUsers,
  updateUser,
  deleteUser,
  getSingleUser,
};
