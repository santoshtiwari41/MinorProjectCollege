import express from "express";

import asyncWrapper from "../../helpers/async.helper";
import DepartmentController from "./department.controller";

const router = express.Router();
const departmentController = new DepartmentController();

router.get("/", asyncWrapper(departmentController.getDepartments));

router.get("/:departmentId", asyncWrapper(departmentController.getDepartment));
router.get(
  "/:departmentId/students",
  asyncWrapper(departmentController.getStudents)
);

export default router;
