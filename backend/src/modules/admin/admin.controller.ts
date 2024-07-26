import bcrypt from "bcryptjs";
import { NextFunction, Request, Response } from "express";

import createHttpError from "http-errors";
import prisma from "../../configs/database";
import sendMail from "../../helpers/nodemailer.helper";
import { generateCredentials } from "./admin.services";

class AdminController {
  registerStudent = async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, phone, batchId } = req.body;

    const batch = await prisma.batch.findFirst({
      where: { id: parseInt(batchId) },
      include: { department: true },
    });

    if (!batch) {
      const error = createHttpError(404, "Invalid Batch");
      return next(error);
    }

    // GET THE COUNT OF STUDENTS STORED
    const count = await prisma.student.count({
      where: {
        batch: {
          id: parseInt(batchId),
          departmentId: batch.departmentId,
        },
      },
    });

    // GENERATE CRN AND !EMAIL
    const { crn, password } = generateCredentials(
      name,
      batch.department.code,
      count + 1
    );

    const hash = await bcrypt.hash(password, 10);
    await prisma.student.create({
      data: {
        name,
        phone,
        email,
        password: hash,
        crn: parseInt(crn),
        batchId: parseInt(batchId),
      },
    });

    // SEND PASSWORD TO THE EMAIL
    const mail = `    
    Welcome to Hamro College,
    Your account has been created successfully. Below are your login credentials:
    Email: ${email}
    Password: ${password}
    Please keep this information secure and do not share it with anyone.
    Best Regards,
    Hamro College Team`;
    sendMail(email, "Your Account Credentials", mail);

    return res.status(201).json({ message: "SUCCESS" });
  };

  registerTeacher = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {};

  getAllStudents = async (req: Request, res: Response, next: NextFunction) => {
    const students = await prisma.student.findMany({
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
    });

    return res.json(students);
  };
}

export default AdminController;
