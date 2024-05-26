import { IDataUser } from "./user";

export interface IBasicResponse {
  msg: string;
  data?: any[];
  err?: string;
}

export interface IUserResponse extends IBasicResponse {
  data?: IDataUser[];
}

export interface IAuthResponse extends IBasicResponse {
  data?: { token: string }[];
}
