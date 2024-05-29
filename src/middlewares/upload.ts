import multer, { Field, Options, diskStorage } from "multer";
import path from "path";
import { NextFunction, Request, Response } from "express-serve-static-core";
import { AppParams } from "../models/params";
import { IAuthResponse } from "../models/response";

const multerDisk = diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/public/imgs");
  },
  filename: (req, file, cb) => {
    const extName = path.extname(file.originalname);
    const newFileName = `image-${Date.now()}${extName}`;
    cb(null, newFileName);
  },
});

const multerOptions: Options = {
  storage: multerDisk,
  limits: {
    fileSize: 1e6, // 1,000,000 bytes (1MB)
  },
  fileFilter: (req, file, cb) => {
    const allowedExtRe = /\.(jpg|png|jpeg)$/i;
    const extName = path.extname(file.originalname);
    if (!allowedExtRe.test(extName)) {
      return cb(new Error("Only .jpg, .png, or .jpeg files are allowed!"));
    }
    cb(null, true);
  },
};

const uploader = multer(multerOptions);

export const singleUploader = (fieldName: string) => (req: Request<AppParams>, res: Response<IAuthResponse>, next: NextFunction) => {
  const uploaders = uploader.single(fieldName);
  uploaders(req, res, function (err) {
    if (err instanceof Error) {
      return res.status(403).json({
        msg: "Forbidden",
        err: err.message,
      });
    }
    next();
  });
};
