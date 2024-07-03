export interface IProductParams {
  uuid: string;
}

export interface IProductQuery {
  product_name?: string;
  min_price?: number;
  max_price?: number;
  category?: string;
  sortBy?: "product_name" | "price" | "latest" | "oldest";
  page?: string;
}

export interface IProductBody {
  product_name: string;
  price: number;
  category: string;
  description: string;
  stock: number;
}

export interface IDataProduct extends IProductBody {
  id: number;
  uuid: string;
  created_at: string;
  updated_at: string | null;
  img?: string | null;
}
