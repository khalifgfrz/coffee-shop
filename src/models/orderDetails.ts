export interface IOrderDetailsParams {
  order_id: number;
}

export interface IOrderDetailsBody {
  products: {
    product_id: number;
    size_id: number;
    qty: number;
  }[];
}

export interface IOrderDetailsData extends IOrderDetailsBody {
  id: number;
  order_id: number;
}
