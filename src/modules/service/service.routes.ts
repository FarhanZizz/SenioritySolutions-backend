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
  "/review/:id",
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.USER),
  serviceController.createReview
);

router.post(
  "/service/create",
  validateRequest(ServiceValidation.createServiceZodSchema),
  // auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
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
