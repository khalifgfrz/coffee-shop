export interface IproductParams {
  uuid: string;
}

export interface IproductQuery {
  product_name?: string;
  price?: number;
  category?: string;
  sortBy?: "product_name" | "price" | "latest" | "oldest";
  page?: "1" | "2" | "3";
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
