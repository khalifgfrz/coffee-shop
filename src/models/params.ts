import { ParamsDictionary } from "express-serve-static-core";
import { IUserParams, IUserQuery } from "./user";
import { IOrderParams, IOrderQuery } from "./order";
import { IProductParams } from "./product";
import { IOrderDetailsParams } from "./orderDetails";

// user params
export type AppUserParams = ParamsDictionary | IUserParams;
export type QueryUserParams = IUserQuery;

// order params
export type AppOrderParams = ParamsDictionary | IOrderParams;
export type QueryOrderParams = IOrderQuery;

// order details params
export type AppOrderDetailsParams = ParamsDictionary | IOrderDetailsParams;

// product params
export type AppProductParams = ParamsDictionary | IProductParams;
export type QueryProductParams = IOrderQuery;

export type AppParams = ParamsDictionary;
