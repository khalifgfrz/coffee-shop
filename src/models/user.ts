export interface IuserParams {
  uuid: string;
}

export interface IuserQuery {
  limit?: number;
  offset?: number;
}

export interface IuserBody {
  full_name: string;
  phone: string;
  address: string;
  email: string;
  password: string;
  role: string;
}

export interface IdataUser extends IuserBody {
  id: number;
  uuid: string;
  created_at: string;
  updated_at: string | null;
}
