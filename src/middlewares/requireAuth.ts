import { verifyToken } from "@clerk/backend";
import { Request, Response, NextFunction } from "express";
import "dotenv/config";

const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Authorization header missing" });
  }

  //Replaces 'Bearer ' with an empty string to get the token
  const token = authHeader.replace("Bearer ", "");

  if (!token) return res.status(401).json({ error: "Token missing" });

  try {
    const payload = await verifyToken(token, {
      secretKey: process.env.CLERK_SECRET_KEY,
    });
    req.user = payload; // Attach the user info to the request object

    next();
  } catch (error) {
    res.status(403).json({ error: "Invalid token" });
  }
};

export default requireAuth;
