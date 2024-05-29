export interface IOrderParams {
  uuid: string;
}

export interface IOrderQuery {
  page?: string;
}

export interface IOrderBody {
  product_ids: number[];
  promo_id: number;
  user_id: number;
  status: string;
}

export interface IDataOrder extends IOrderBody {
  id: number;
  no_order: string;
  date: string;
  product_id: number;
  created_at: string;
  updated_at: string | null;
}
