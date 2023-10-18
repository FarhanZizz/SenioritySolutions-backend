import express from "express";
import auth from "../../app/middlewares/auth";
import { ENUM_USER_ROLE } from "../../enums/user";
import validateRequest from "../../app/middlewares/validateRequest";
import { contentValidation } from "./content.validation";
import { contentController } from "./content.controller";

const router = express.Router();

router.get("/blogpost", contentController.getAllBlogs);
router.post(
  "/blogpost",
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(contentValidation.BlogPostSchema),
  contentController.createBlogPost
);
router.patch(
  "/blogpost/:id",
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  contentController.updateBlog
);
router.delete(
  "/blogpost/:id",
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  contentController.deleteBlog
);
router.get("/faq", contentController.getAllFaq);
router.post(
  "/faq",
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(contentValidation.FAQSchema),
  contentController.createFaq
);
router.patch(
  "/faq/:id",
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  contentController.updateFaq
);
router.delete(
  "/faq/:id",
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  contentController.deleteFaq
);

export const ContentRoutes = router;
