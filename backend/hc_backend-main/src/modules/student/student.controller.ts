import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import prisma from "../../configs/database";

class StudentController {
  setFcmToken = async (req: Request, res: Response, next: NextFunction) => {
    const { fcmToken, studentId } = req.body;

    await prisma.student.update({
      where: { id: +studentId },
      data: {
        fcmToken,
      },
    });
    return res.json({
      message: "SUCCESS",
    });
  };

  getProfile = async (req: Request, res: Response, next: NextFunction) => {
    const { studentId } = req.query;
    console.log("Received studentId:", studentId);

    if (!studentId || isNaN(+studentId)) {
      return next(createHttpError(400, "Invalid or missing studentId."));
    }

    try {
      const profile = await prisma.student.findFirst({
        where: { id: +studentId },
        select: {
          batch: {
            select: {
              id:true,
              name: true,
              startYear: true,
              endYear: true,
              department: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
          profile: {
            select: {
              image: true,
            },
          },
          name: true,
          email: true,
          crn: true,
          phone: true,
        },
      });

      if (!profile) {
        return next(createHttpError(404, "Profile not found."));
      }

      return res.json(profile);
    } catch (error) {
      console.error("Error fetching profile:", error);
      return next(
        createHttpError(500, "Failed to fetch profile. Please try again later.")
      );
    }
  };
}

export default StudentController;
