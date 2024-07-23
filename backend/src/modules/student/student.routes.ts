import express from "express";

import asyncWrapper from "../../helpers/async.helper";
import StudentController from "./student.controller";

const router = express.Router();
const studentController = new StudentController();

router.patch("/fcm-token", asyncWrapper(studentController.setFcmToken));
router.get("/profile", asyncWrapper(studentController.getProfile));

export default router;
