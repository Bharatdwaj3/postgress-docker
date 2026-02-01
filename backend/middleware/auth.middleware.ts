import jwt from "jsonwebtoken";
import { JWT_ACC_SECRECT } from "../config/env.config.ts";

import express from 'express';

type Request = express.Request;
type Response = express.Response;
type NextFunction = express.NextFunction;


export const authUser = async (req: Request, res: Response, next: NextFunction) => {


  let payload = null;
  let authMethod = null;
  const token = req.cookies.accessToken;
  if (token) {
    try {
      payload = jwt.verify(token, JWT_ACC_SECRECT);
      req.user = payload.user;
      authMethod = "jwt";

      const user = await User.findById(payload.user.id).select("isActive");
      if (!user || !user.isActive) {
        return res.status(401).json({ message: "User interaction or deleted" });
      }
      return next();
    } catch (errr) {
      console.warn(`JWT verification failed: ${errr.message}`);
      return res.status(401).json({ message: "Invalid token", code: "JWT_VERIFY_FAIL" });
    }
  }

return res.status(401).json({
  success: false,
  message: "Access denied: no valid token or session",
  code: "Auth_required",
});
};