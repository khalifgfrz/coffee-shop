export interface IUserParams {
  uuid: string;
}

export interface IUserQuery {
  page?: string;
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
  img?: string | null;
}

export interface IUserRegisterBody extends IUserBody {
  pwd: string;
}

export interface IUserLoginBody {
  email: string;
  full_name: string;
  role: string;
  pwd: string;
}
