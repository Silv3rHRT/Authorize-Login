import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
  username: string;
}

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
):void => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(400).json({ message: "Authorization Header not found" });
    return;
  }

  const token = authHeader.split(" ")[1];

  const secretKey = process.env.JWT_SECRET_KEY || "";

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
    res.status(401).json({ message: "invalid token" }); //Unauthorized
    return;
    }

    req.user = user as JwtPayload;
    next();
  });
};
