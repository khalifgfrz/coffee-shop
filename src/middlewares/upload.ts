import multer, { Options, StorageEngine, diskStorage, memoryStorage } from "multer";
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

const multerMemory = memoryStorage();

const createMulterOptions = (storageEngine: StorageEngine): Options => ({
  storage: storageEngine,
  limits: {
    fileSize: 1e6, // 1,000,000 bytes (1MB)
  },
  fileFilter: (req, file, cb) => {
    const allowedExtRe = /\.(jpg|png|jpeg|webp)$/i;
    const extName = path.extname(file.originalname);
    if (!allowedExtRe.test(extName)) {
      return cb(new Error("Incorrect File"));
    }
    cb(null, true);
  },
});

const uploader = multer(createMulterOptions(multerDisk));
const cloudUploader = multer(createMulterOptions(multerMemory));

export const singleUploader = (fieldName: string) => (req: Request<AppParams>, res: Response<IAuthResponse>, next: NextFunction) => {
  const uploaders = uploader.single(fieldName);
  uploaders(req, res, function (err) {
    if (err instanceof Error) {
      return res.status(400).json({
        msg: "Bad Request",
        err: err.message,
      });
    }
    next();
  });
};

export const singleCloudUploader = (fieldName: string) => (req: Request<AppParams>, res: Response<IAuthResponse>, next: NextFunction) => {
  const uploaders = cloudUploader.single(fieldName);
  uploaders(req, res, function (err) {
    if (err instanceof Error) {
      return res.status(400).json({
        msg: "Bad Request",
        err: err.message,
      });
    }
    next();
  });
};
