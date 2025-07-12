import { NextFunction, Request, Response } from "express-serve-static-core";
import jwt, { SignOptions, VerifyErrors } from "jsonwebtoken";

import { AppUserParams } from "../models/params";
import { IAuthResponse } from "../models/response";
import { IPayload } from "../models/payload";

// Sign options hanya untuk membuat token
export const jwtOptions: SignOptions = {
  expiresIn: "1d",
  issuer: process.env.JWT_ISSUER,
};

// Verify options hanya untuk memverifikasi token
const jwtVerifyOptions = {
  issuer: process.env.JWT_ISSUER,
};

export const authorization =
  (role?: string[]) =>
  (
    req: Request<AppUserParams>,
    res: Response<IAuthResponse>,
    next: NextFunction
  ) => {
    const bearerToken = req.header("Authorization");

    if (!bearerToken) {
      return res.status(403).json({
        msg: "Forbidden",
        err: "Tidak dapat diakses",
      });
    }

    const token = bearerToken.split(" ")[1];

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("JWT_SECRET is not defined in environment variables");
    }

    jwt.verify(
      token,
      secret,
      jwtVerifyOptions,
      (err: VerifyErrors | null, payload: unknown) => {
        if (err || typeof payload !== "object" || payload === null) {
          return res.status(403).json({
            msg: err?.message || "Invalid token",
            err: err?.name || "Forbidden",
          });
        }

        const typedPayload = payload as IPayload;

        if (role && (!typedPayload.role || !role.includes(typedPayload.role))) {
          return res.status(403).json({
            msg: "Forbidden",
            err: "Akses ditolak",
          });
        }

        req.userPayload = typedPayload;
        next();
      }
    );
  };
