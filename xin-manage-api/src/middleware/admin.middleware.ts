import { Admin, AdminModel } from "@models/admin.model";
import { AppError } from "@models/error";
import JwtService from "@services/vendors/jwt.service";
import { NextFunction, Request, Response } from "express";
import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";

const jwtService = new JwtService();
export default async function adminMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    let authorization = req.headers.authorization;
    let accessToken = authorization?.split(" ")?.[1] || "";

    let decoded = jwtService.verifyAccessToken(accessToken);

    let admin = await AdminModel.findOne({_id: decoded.id, email: decoded.email});
    if (!admin){
      throw new AppError({
        where: "adminMiddleware",
        message: "Invalid token",
        statusCode: 401,
        detail: ""
      });
    }

    req.admin = new Admin(admin)
    
    next()
  } catch (err: any) {
    let errorMessage: string;
    let statusCode: number;

    if (err instanceof JsonWebTokenError) {
      // JWT specific errors
      errorMessage = "Invalid token";
      statusCode = 401;
    } else if (err instanceof TokenExpiredError) {
      // Token expiration error
      errorMessage = "Token has expired";
      statusCode = 401;
    } else if (
      typeof err.message === "string" &&
      err.message.includes("missing")
    ) {
      // Missing token errors
      errorMessage = err.message;
      statusCode = 400;
    } else {
      // Handle other errors
      errorMessage = "An unexpected error occurred";
      statusCode = 500;
    }
    res.status(statusCode).json({ message: errorMessage });
  }
}
