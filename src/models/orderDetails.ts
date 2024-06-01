export interface IOrderDetailsBody {
  orderdetails_ids: number[];
}

export interface IOrderDetailsData {
  id: number;
  size_id: number;
  order_id: number;
  product_id: number;
  qty: number;
  subtotal: number;
}
