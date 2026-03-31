import bcrypt from "bcrypt";
import httpStatus from "http-status";
import jwt, { Secret } from "jsonwebtoken";
import { prisma } from "../../app";
import config from "../../config";
import ApiError from "../../errors/ApiError";
import { ILoginUser, IUser } from "./user.interface";

const createUser = async (user: IUser): Promise<Omit<IUser, "password"> | null> => {
  const hashedPassword = await bcrypt.hash(user.password, 12);
  const createdUser = await prisma.user.create({
    data: { ...user, password: hashedPassword } as any,
    select: { id: true, name: true, email: true, phone: true, role: true, address: true, profileImage: true },
  });
  return createdUser as any;
};

const loginUser = async (payload: ILoginUser): Promise<string> => {
  const { email, password } = payload;
  const user = await prisma.user.findUnique({ where: { email }, select: { id: true, role: true, password: true } });
  if (!user) throw new ApiError(httpStatus.NOT_FOUND, "User does not exist");
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) throw new ApiError(httpStatus.UNAUTHORIZED, "Password is incorrect");
  const { id, role } = user;
  const token = jwt.sign({ id, role }, config.jwt.secret as Secret, { expiresIn: config.jwt.expires_in });
  return token;
};

const getAllUsers = async (): Promise<IUser[]> => {
  return prisma.user.findMany({ select: { id: true, name: true, email: true, phone: true, role: true, address: true, profileImage: true } as any });
};

const getSingleUser = async (id: string): Promise<IUser | null> => {
  return prisma.user.findUnique({ where: { id }, select: { id: true, name: true, email: true, phone: true, role: true, address: true, profileImage: true } as any });
};

const updateUser = async (id: string, payload: Partial<IUser>): Promise<IUser | null> => {
  if (payload.password) {
    payload.password = await bcrypt.hash(payload.password, 12);
  }
  return prisma.user.update({ where: { id }, data: payload as any, select: { id: true, name: true, email: true, phone: true, role: true, address: true, profileImage: true } as any });
};

const deleteUser = async (id: string): Promise<IUser | null> => {
  return prisma.user.delete({ where: { id } });
};

const changeRole = async (id: string, role: string): Promise<IUser | null> => {
  return prisma.user.update({ where: { id }, data: { role } as any, select: { id: true, name: true, email: true, phone: true, role: true } as any });
};

export const UserService = { createUser, loginUser, getAllUsers, updateUser, deleteUser, getSingleUser, changeRole };
