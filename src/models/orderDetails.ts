export interface IOrderDetailsParams {
  order_id: number;
}

export interface IOrderDetailsBody {
  size_id: number;
  product_ids: number[];
  qty: number;
  subtotal: number;
}

export interface IOrderDetailsData extends IOrderDetailsBody {
  id: number;
  order_id: number;
  product_id: number;
}
