import { NextFunction, Request, Response } from "express";
import prisma from "../../configs/database";

class BatchController {
  createBatch = async (req: Request, res: Response, next: NextFunction) => {
    const { name, startYear, endYear, departmentId } = req.body;
    try {
      await prisma.batch.create({
        data: {
          name,
          startYear: parseInt(startYear),
          endYear: parseInt(endYear),
          departmentId: parseInt(departmentId),
        },
      });
      return res.json({
        message: "SUCCESS",
      });
    } catch (err) {
      console.log(err);
    }
  };

  getBatchs = async (req: Request, res: Response, next: NextFunction) => {
    const batchs = await prisma.batch.findMany({});
    return res.json(batchs);
  };

  getBatch = async (req: Request, res: Response, next: NextFunction) => {
    const batch = await prisma.batch.findFirst({
      where: { id: parseInt(req.params.batchId) },
    });
    return res.json(batch);
  };

  getStudents = async (req: Request, res: Response, next: NextFunction) => {
    const students = await prisma.batch.findFirst({
      where: { id: parseInt(req.params.batchId) },
      select: {
        students: {
          select: {
            crn: true,
            name: true,
            batch: {
              select: {
                name: true,
                department: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    return res.json(students);
  };
}

export default BatchController;
