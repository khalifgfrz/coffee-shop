export interface ISizesParams {
  uuid: string;
}

export interface ISizesBody {
  size: string;
  added_cost: number;
}

export interface IDataSizes extends ISizesBody {
  id: number;
  uuid: string;
  created_at: string;
  updated_at: string | null;
}
