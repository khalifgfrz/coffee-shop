import { QueryResult } from "pg";
import { IDataFavorite } from "../models/favorite";
import db from "../configs/pg";

export const getAllFavorite = (): Promise<QueryResult<IDataFavorite>> => {
  let query = `select f.id, p.uuid, p.product_name, p.price, p.category, p.description, p.stock, p.image from favorite f
    join product p on f.product_id = p.id`;

  return db.query(query);
};
