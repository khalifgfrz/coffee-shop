import * as express from "express-serve-static-core";
import { IPayload } from "./src/models/payload";

declare global {
  namespace Express {
    interface Request {
      userPayload?: IPayload | string;
    }
  }
}
