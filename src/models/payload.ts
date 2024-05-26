import { JwtPayload } from "jsonwebtoken";

export interface IPayload extends JwtPayload {
  // jangan masukan data sensitif
  uuid?: string;
  role?: string;
}
