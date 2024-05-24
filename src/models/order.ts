export interface IorderParams {
  no_order: string;
}

export interface IorderQuery {
  page?: "1" | "2" | "3";
}

export interface IorderBody {
  product_id: number;
  promo_id: number;
  user_id: number;
  status: string;
}

export interface IdataOrder extends IorderBody {
  id: number;
  no_order: string;
  date: string;
  created_at: string;
  updated_at: string | null;
}
