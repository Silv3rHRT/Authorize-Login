import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
  username: string;
}

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(400).json({ message: "Authorization Header not found" });
  }

  const token = authHeader.split(" ")[1];

  const secretKey = process.env.JWT_SECRET_KEY || "";

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.status(401).json({ message: "invalid token" }); //Unauthorized
    }

    req.user = user as JwtPayload;
    return next();
  });
};
