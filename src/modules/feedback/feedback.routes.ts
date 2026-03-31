import express from "express";
import auth from "../../app/middlewares/auth";
import { ENUM_USER_ROLE } from "../../enums/user";
import { feedbackController } from "./feedback.controller";
import validateRequest from "../../app/middlewares/validateRequest";
import { FeedbackValidation } from "./feedback.validation";

const router = express.Router();

router.post("/feedback", validateRequest(FeedbackValidation.createFeedbackZodSchema), feedbackController.createFeedback);
router.get("/feedback", auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN), feedbackController.getAllFeedback);
router.delete("/feedback/:id", auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN), feedbackController.deleteFeedback);

export const FeedbackRoutes = router;
