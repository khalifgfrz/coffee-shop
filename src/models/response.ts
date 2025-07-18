import { IDataFavorite } from "./favorite";
import { IDataOrder } from "./order";
import { IOrderDetailsData } from "./orderDetails";
import { IDataProduct } from "./product";
import { IDataPromo } from "./promo";
import { IDataSizes } from "./sizes";
import { IDataUser } from "./user";

interface IPaginationMeta {
  totalData?: number;
  totalPage?: number;
  page: number;
  prevLink: string | null;
  nextLink: string | null;
}

export interface IBasicResponse {
  msg: string;
  data?: any[];
  err?: string;
  meta?: IPaginationMeta;
}

export interface IUserResponse extends IBasicResponse {
  data?: IDataUser[];
}

export interface IOrderResponse extends IBasicResponse {
  data?: IDataOrder[];
}

export interface IProductResponse extends IBasicResponse {
  data?: IDataProduct[];
}

export interface IPromoResponse extends IBasicResponse {
  data?: IDataPromo[];
}

export interface IFavoriteResponse extends IBasicResponse {
  data?: IDataFavorite[];
}

export interface ISizesResponse extends IBasicResponse {
  data?: IDataSizes[];
}

export interface ISizesResponse extends IBasicResponse {
  data?: IDataSizes[];
}

export interface IOrderDetailsResponse extends IBasicResponse {
  data?: IOrderDetailsData[];
}

export interface IAuthResponse extends IBasicResponse {
  data?: { token: string }[];
}

export interface IOrderWithDetailsResponse extends IBasicResponse {
  data?: IDataOrder[];
}
