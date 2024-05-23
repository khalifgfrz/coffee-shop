export interface IproductParams {
  uuid: string;
}

export interface IproductQuery {
  product_name?: string;
  price?: number;
  category?: string;
  sortName?: "alphabet";
  latest?: "latest";
  oldest?: "oldest";
  sortPrice?: "cheapest";
  limit?: number;
  offset?: number;
}

export interface IproductBody {
  product_name: string;
  price: number;
  category: string;
  description: string;
  product_size: string;
  method: string;
  stock: number;
}

export interface IdataProduct extends IproductBody {
  id: number;
  uuid: string;
  created_at: string;
  updated_at: string | null;
}
