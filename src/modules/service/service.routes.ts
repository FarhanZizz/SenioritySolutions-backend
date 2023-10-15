import express from "express";
import auth from "../../app/middlewares/auth";
import { ENUM_USER_ROLE } from "../../enums/user";
import validateRequest from "../../app/middlewares/validateRequest";
import { serviceController } from "./service.controller";
import { serviceSchema } from "./service.validation";

const router = express.Router();

router.get(
  "/service",
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.USER),
  serviceController.getAllService
);
router.post(
  "/review/:id",
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.USER),
  serviceController.createReview
);

router.post(
  "/service/create",
  validateRequest(serviceSchema),
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  serviceController.createService
);
router.patch(
  "/service/:id",
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  serviceController.updateService
);
router.delete(
  "/service/:id",
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  serviceController.deleteService
);

export const serviceRoutes = router;
