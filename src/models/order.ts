export interface IOrderParams {
  uuid: string;
}

export interface IOrderQuery {
  page?: string;
}

export interface IOrderBody {
  user_id: number;
  subtotal: number;
  tax: number;
  payment_id: number;
  delivery_id: number;
  promo_id: number;
  status: string;
  grand_total: number;
}

export interface IDataOrder extends IOrderBody {
  id: number;
  uuid: string;
  created_at: string;
  updated_at: string | null;
}
