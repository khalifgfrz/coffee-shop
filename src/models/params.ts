import { ParamsDictionary } from "express-serve-static-core";
import { IUserParams } from "./user";

export type AppParams = ParamsDictionary | IUserParams;
