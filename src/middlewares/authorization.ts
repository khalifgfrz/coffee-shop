import { NextFunction, Request, Response } from "express-serve-static-core";
import jwt, { SignOptions } from "jsonwebtoken";

import { AppUserParams } from "../models/params";
import { IAuthResponse } from "../models/response";
import { IPayload } from "../models/payload";

export const jwtOptions: SignOptions = {
  expiresIn: "1d", // token akan hangus dalam 1 jam
  issuer: process.env.JWT_ISSUER,
};

export const authorization = (role?: string[]) => (req: Request<AppUserParams>, res: Response<IAuthResponse>, next: NextFunction) => {
  // cek jwt
  //  ambil jwt dari header
  const bearerToken = req.header("Authorization");
  //   handle jika tanpa token
  if (!bearerToken) {
    return res.status(403).json({
      msg: "Forbidden",
      err: "Tidak dapat diakses",
    });
  }
  const token = bearerToken.split(" ")[1];
  // verifikasi token
  jwt.verify(token, <string>process.env.JWT_SECRET, jwtOptions, (err, payload) => {
    // !valid = ditolak
    if (err) {
      return res.status(403).json({
        msg: err.message,
        err: err.name,
      });
    }

    // pengecekan role
    if (role) {
      if (!role.includes((payload as IPayload).role as string)) {
        return res.status(403).json({
          msg: "Forbidden",
          err: "Akses ditolak",
        });
      }
    }

    // valid = lanjut
    req.userPayload = payload;
    next();
  });
};
