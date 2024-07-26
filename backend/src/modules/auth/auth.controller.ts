import bcrypt from "bcryptjs";
import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";

import prisma from "../../configs/database";
import sendMail from "../../helpers/nodemailer.helper";
import { generateOtp, generateTokens } from "./auth.services";

class AuthController {
  loginStudent = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password,expoPushToken } = req.body;

    const student = await prisma.student.findFirst({ where: { email } });
    if (!student) {
      const error = createHttpError(404, "Student not found");
      return next(error);
    }
    await prisma.student.update({
      where: { id: student.id },
      data: { fcmToken: expoPushToken },
    });
    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      const error = createHttpError(401, "Credentials doesn't match");
      return next(error);
    }

    const { accessToken, refreshToken } = await generateTokens({
      id: student.id,
    });

    return res.json({
      accessToken,
      refreshToken,
    });
  };

  loginTeacher = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.body.email) {
      const error = createHttpError(400, "Password doesn't match.");
      return next(error);
    }

    return res.json({
      accessToken: "access-token",
      refreshToken: "refresh-token",
    });
  };

  studentChangePassword = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    if (!req.body.email) {
      const error = createHttpError(400, "Password doesn't match.");
      return next(error);
    }
    // GET THE OLD PASSWORD AND VALIDATE
    // SET NEW PASSWORD AND GENERATE TOKENS

    return res.json({});
  };
  teacherChangePassword = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    if (!req.body.email) {
      const error = createHttpError(400, "Password doesn't match.");
      return next(error);
    }

    return res.json({});
  };

  studentForgotPassword = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { email, password } = req.body;
    
    const student = await prisma.student.findFirst({
      where: { AND: { email, otp: null } },
    });

    if (!student) {
      const error = createHttpError(
        404,
        "Student not found or OTP not verified"
      );
      return next(error);
    }

    await prisma.student.update({
      where: { email },
      data: {
        password: await bcrypt.hash(password, 10),
      },
    });

    return res.json({});
  };
  teacherForgotPassword = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    // GET THE OTP TOKEN AND VALIDATE
    // SET NEW PASSWORD AND EMAIL

    return res.json({});
  };

  issueOtp = async (req: Request, res: Response, next: NextFunction) => {
    const email = req.body.email;

    const { otp, expiryTime } = await generateOtp();

    await prisma.student.update({
      where: { email },
      data: {
        otp,
        expiryTime,
      },
    });

    // SEND OTP TO THE EMAIL
    const mail = `    
        Welcome to Hamro College,
        Below are your forgot password credentials:
        Otp: ${otp}
        Please keep this information secure and do not share it with anyone.
        Best Regards,
        Hamro College Team`;

    sendMail(email, "Here is your otp", mail);

    return res.json({ message: "SUCCESS" });
  };

  verifyOtp = async (req: Request, res: Response, next: NextFunction) => {
    const otp = +req.body.otp;

    const student = await prisma.student.findFirst({
      where: { otp },
      select: { id: true, expiryTime: true },
    });

    if (!student) {
      const error = createHttpError(400, "Invalid otp");
      return next(error);
    }

    const currentTime = new Date();
    const expiryTime = new Date(student.expiryTime!);

    if (currentTime > expiryTime) {
      const error = createHttpError(400, "Otp has expired");
      return next(error);
    }

    await prisma.student.update({
      where: { id: student.id },
      data: {
        otp: null,
        expiryTime: null,
      },
    });

    return res.json({ message: "SUCCESS" });
  };
}

export default AuthController;
