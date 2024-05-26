export interface IOrderParams {
  no_order: string;
}

export interface IOrderQuery {
  page?: "1" | "2" | "3";
}

export interface IOrderBody {
  product_id: number;
  promo_id: number;
  user_id: number;
  status: string;
}

export interface IDataOrder extends IOrderBody {
  id: number;
  no_order: string;
  date: string;
  created_at: string;
  updated_at: string | null;
}
