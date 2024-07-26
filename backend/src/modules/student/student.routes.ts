import express from "express";

import asyncWrapper from "../../helpers/async.helper";
import authMiddleware from "../../middlewares/auth.middleware";
import uploadMiddleware from "../../middlewares/upload.middleware";
import StudentController from "./student.controller";

const router = express.Router();
const studentController = new StudentController();

router.patch("/fcm-token", asyncWrapper(studentController.setFcmToken));
router.get("/profile", asyncWrapper(studentController.getProfile));

router.patch(
  "/profile/image",
  uploadMiddleware.single("profile"),
  authMiddleware,
  asyncWrapper(studentController.uploadProfileImage)
);

export default router;
