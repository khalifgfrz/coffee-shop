export interface IUserParams {
  uuid: string;
}

export interface IUserQuery {
  page?: "1" | "2" | "3";
}

export interface IUserBody {
  full_name: string;
  phone: string;
  address: string;
  email: string;
  role: string;
}

export interface IDataUser extends IUserBody {
  id: number;
  uuid: string;
  created_at: string;
  updated_at: string | null;
}

export interface IUserResgisterBody extends IUserBody {
  pwd: string;
}

export interface IUserLoginBody {
  uuid: string;
  pwd: string;
}
