export interface IpromoParams {
  uuid: string;
}

export interface IpromoBody {
  promo_name: string;
  discount_type: string;
  flat_amount: number;
  percent_amount: number;
}

export interface IdataPromo extends IpromoBody {
  id: number;
  uuid: string;
  created_at: string;
  updated_at: string | null;
}
