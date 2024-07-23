import express from "express";

import asyncWrapper from "../../helpers/async.helper";
import BatchController from "./batch.controller";

const router = express.Router();
const batchController = new BatchController();

router.post("/", asyncWrapper(batchController.createBatch));
router.get("/", asyncWrapper(batchController.getBatchs));

router.get("/:batchId", asyncWrapper(batchController.getBatch));
router.get("/:batchId/students", asyncWrapper(batchController.getStudents));

export default router;

// getAllStudentsByBatch = async (
//     req: Request,
//     res: Response,
//     next: NextFunction
//   ) => {
//     const students = await prisma.student.findMany({
//       where: { batchId: +req.params.batchId },
//       select: {
//         crn: true,
//         name: true,
//         batch: {
//           select: {
//             name: true,
//             department: {
//               select: {
//                 name: true,
//               },
//             },
//           },
//         },
//       },
//     });

//     return res.json(students);
//   };
//   getAllStudentsByDepartment = async (
//     req: Request,
//     res: Response,
//     next: NextFunction
//   ) => {
//     const students = await prisma.student.findMany({
//       where: {
//         batch: {
//           departmentId: +req.params.departmentId,
//         },
//       },
//       select: {
//         crn: true,
//         name: true,
//         batch: {
//           select: {
//             name: true,
//             department: {
//               select: {
//                 name: true,
//               },
//             },
//           },
//         },
//       },
//     });

//     return res.json(students);
//   };
