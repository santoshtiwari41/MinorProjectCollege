import express from "express";

import asyncWrapper from "../../helpers/async.helper";
import AdminController from "./admin.controller";

const router = express.Router();
const adminController = new AdminController();

router.post("/student/register", asyncWrapper(adminController.registerStudent));
router.get("/students", asyncWrapper(adminController.getAllStudents));

router.post("/teacher/register", asyncWrapper(adminController.registerTeacher));

export default router;
