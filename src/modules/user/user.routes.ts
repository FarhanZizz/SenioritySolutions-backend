import express from "express";
import auth from "../../app/middlewares/auth";
import { ENUM_USER_ROLE } from "../../enums/user";
import { UserController } from "./user.controller";
import validateRequest from "../../app/middlewares/validateRequest";
import { UserValidation } from "./user.validation";

const router = express.Router();

router.post(
  "/auth/signup",
  validateRequest(UserValidation.createUserZodSchema),
  UserController.createUser
);
router.post("/auth/signin", UserController.loginUser);

router.get(
  "/profile",
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER, ENUM_USER_ROLE.SUPER_ADMIN),
  UserController.getProfile
);
router.patch(
  "/users/:id",
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.USER),
  UserController.updateUser
);
router.get(
  "/users/:id",
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  UserController.getSingleUser
);
router.delete(
  "/users/:id",
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  UserController.deleteUser
);
router.get(
  "/users",
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  UserController.getAllUsers
);

export const UserRoutes = router;
