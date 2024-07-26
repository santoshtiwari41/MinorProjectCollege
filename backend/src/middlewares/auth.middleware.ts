import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import jwt from "jsonwebtoken";

import config from "../configs/constants";

export interface AuthRequest extends Request {
  userId: string;
}

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return next(createHttpError(401, "Authentication token is required"));
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    // @ts-ignore
    req.userId = decoded.id;
    next();
  } catch (error) {
    return next(createHttpError(401, "Token is expired"));
  }
};

export default authMiddleware;
