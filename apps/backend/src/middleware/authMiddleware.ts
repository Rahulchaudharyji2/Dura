import { verifyToken } from "@clerk/backend";
import { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

console.log("Secret exists:", !!process.env.CLERK_SECRET_KEY);
    if (!authHeader) {
      return res.status(401).json({ message: "No token found" });
    }

   const token = authHeader.split(" ")[1];
    console.log("Token:", token);
//@ts-ignore
    const payload = await verifyToken(token, {
      secretKey: process.env.CLERK_SECRET_KEY,
    });

    console.log("Payload:", payload);
    //@ts-ignore

    req.userId = payload.sub;

    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({
      message: "Invalid token",
      error: String(err),
    });
  }
};