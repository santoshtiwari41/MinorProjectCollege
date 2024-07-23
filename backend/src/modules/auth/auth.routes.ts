import express from "express";

import asyncWrapper from "../../helpers/async.helper";
import AuthController from "./auth.controller";

const router = express.Router();
const authController = new AuthController();

router.post("/student/login", asyncWrapper(authController.loginStudent));
router.patch(
  "/student/change-password",
  asyncWrapper(authController.studentChangePassword)
);
router.post(
  "/student/forgot-password",
  asyncWrapper(authController.studentForgotPassword)
);

router.post("/teacher/login", asyncWrapper(authController.loginTeacher));
router.patch(
  "/teacher/change-password",
  asyncWrapper(authController.teacherChangePassword)
);
router.post(
  "/teacher/forgot-password",
  asyncWrapper(authController.teacherForgotPassword)
);

// Common Routes
router.post("/otp", asyncWrapper(authController.issueOtp));
router.post("/verify", asyncWrapper(authController.verifyOtp));

export default router;
