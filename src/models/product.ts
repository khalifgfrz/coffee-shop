export interface IProductParams {
  uuid: string;
}

export interface IProductQuery {
  product_name?: string;
  price?: number;
  category?: string;
  sortBy?: "product_name" | "price" | "latest" | "oldest";
  page?: "1" | "2" | "3";
}

export interface IProductBody {
  product_name: string;
  price: number;
  category: string;
  description: string;
  product_size: string;
  method: string;
  stock: number;
}

export interface IDataProduct extends IProductBody {
  id: number;
  uuid: string;
  created_at: string;
  updated_at: string | null;
}
