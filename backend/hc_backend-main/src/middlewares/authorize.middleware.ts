import { NextFunction, Request, Response } from "express";

const authorizeMiddleware = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // const roleFromToken = req.auth.role;

    // if (!roles.includes(roleFromToken)) {
    //   const error = createHttpError(403, "You don't have enough permissions");

    //   next(error);
    //   return;
    // }
    next();
  };
};

export default authorizeMiddleware;
