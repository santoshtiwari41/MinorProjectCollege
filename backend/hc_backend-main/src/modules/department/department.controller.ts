import { NextFunction, Request, Response } from "express";
import prisma from "../../configs/database";

class DepartmentController {
  getDepartments = async (req: Request, res: Response, next: NextFunction) => {
    const departments = await prisma.department.findMany({
      select: {
        name: true,
        code: true,
        hod: {
          select: {
            name: true,
            phone: true,
          },
        },
      },
    });
    return res.json(departments);
  };

  getDepartment = async (req: Request, res: Response, next: NextFunction) => {
    const department = await prisma.department.findFirst({
      where: { id: parseInt(req.params.departmentId) },
      select: {
        name: true,
        code: true,
        hod: {
          select: {
            name: true,
            phone: true,
          },
        },
      },
    });
    return res.json(department);
  };

  getStudents = async (req: Request, res: Response, next: NextFunction) => {
    const students = await prisma.department.findFirst({
      where: { id: parseInt(req.params.departmentId) },
      select: {
        batches: {
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
        },
      },
    });
    return res.json(students);
  };
}

export default DepartmentController;
