export interface IuserParams {
  uuid: string;
}

export interface IuserQuery {
  page?: "1" | "2" | "3";
}

export interface IuserBody {
  full_name: string;
  phone: string;
  address: string;
  email: string;
  role: string;
}

export interface IdataUser extends IuserBody {
  id: number;
  uuid: string;
  created_at: string;
  updated_at: string | null;
}

export interface IuserResgisterBody extends IuserBody {
  pwd: string;
}

export interface IuserLoginBody {
  uuid: string;
  pwd: string;
}
