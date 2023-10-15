import express from "express";
import auth from "../../app/middlewares/auth";
import { ENUM_USER_ROLE } from "../../enums/user";
import validateRequest from "../../app/middlewares/validateRequest";
import { serviceController } from "./service.controller";
import { serviceSchema } from "./service.validation";

const router = express.Router();

router.post(
  "/service/create",
  validateRequest(serviceSchema),
  //   auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  serviceController.createService
);

export const serviceRoutes = router;
