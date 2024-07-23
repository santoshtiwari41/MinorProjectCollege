import { NextFunction, Request, Response } from "express";
import { HttpError } from "http-errors";
import { v4 as uuidv4 } from "uuid";

import config from "../configs/constants";
import logger from "../helpers/logger.helper";

const errorMiddleware = (
  err: HttpError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errorId = uuidv4();

  const statusCode = err.status || 500;
  const isProduction = config.env === "production";
  const message = isProduction ? `An unexpected error occurred.` : err.message;

  logger.error(err.message, {
    id: errorId,
    error: err.stack,
    path: req.path,
    method: req.method,
  });

  res.status(statusCode).json({
    errors: [
      {
        ref: errorId,
        type: err.name,
        msg: message,
        path: req.path,
        location: "server",
        stack: isProduction ? null : err.stack,
      },
    ],
  });
};

export default errorMiddleware;
