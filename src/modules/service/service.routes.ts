import express from "express";
import auth from "../../app/middlewares/auth";
import { ENUM_USER_ROLE } from "../../enums/user";
import validateRequest from "../../app/middlewares/validateRequest";
import { serviceController } from "./service.controller";
import { ServiceValidation } from "./service.validation";

const router = express.Router();

router.get("/service", serviceController.getAllService);
router.get("/service/:id", serviceController.singleService);

router.post(
  "/service/create",
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(ServiceValidation.createServiceZodSchema),
  serviceController.createService
);
router.patch(
  "/service/:id",
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(ServiceValidation.updateServiceZodSchema),
  serviceController.updateService
);
router.delete(
  "/service/:id",
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  serviceController.deleteService
);
router.post(
  "/review/:id",
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.USER),
  serviceController.createReview
);

export const serviceRoutes = router;
