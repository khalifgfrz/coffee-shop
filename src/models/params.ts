import { ParamsDictionary } from "express-serve-static-core";
import { IUserParams, IUserQuery } from "./user";
import { IOrderParams, IOrderQuery } from "./order";
import { IProductParams } from "./product";

// user params
export type AppUserParams = ParamsDictionary | IUserParams;
export type QueryUserParams = IUserQuery;

// order params
export type AppOrderParams = ParamsDictionary | IOrderParams;
export type QueryOrderParams = IOrderQuery;

// product params
export type AppProductParams = ParamsDictionary | IProductParams;
export type QueryProductParams = IOrderQuery;
