export interface IPromoParams {
  uuid: string;
}

export interface IPromoBody {
  promo_name: string;
  discount_type: string;
  flat_amount: number;
  percent_amount: number;
}

export interface IDataPromo extends IPromoBody {
  id: number;
  uuid: string;
  created_at: string;
  updated_at: string | null;
}
