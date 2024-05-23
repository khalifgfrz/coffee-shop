import { QueryResult } from "pg";

import db from "../configs/pg";
import { IdataOrder, IorderBody, IorderQuery } from "../models/order";

export const getAllOrder = (que: IorderQuery): Promise<QueryResult<IdataOrder>> => {
  let query = `select ol.id, ol."no_order", ol."date", p.product_name, ol.status, p.price, p2.promo_name from order_list ol
    join product p on ol.product_id = p.id
    join promo p2 on ol.promo_id = p2.id`;
  const values = [];
  const { limit, offset } = que;
  if (limit) {
    query += " limit $1";
    values.push(`${limit}`);
    if (offset) {
      query += " offset $2";
      values.push(`${offset}`);
    }
  } else if (offset) {
    query += " offset $1";
    values.push(`${offset}`);
  }
  return db.query(query, values);
};

export const getOneOrder = (no_order: string): Promise<QueryResult<IdataOrder>> => {
  const query = `select ol.id, ol."no_order", ol."date", p.product_name, ol.status, p.price, p2.promo_name from order_list ol
  join product p on ol.product_id = p.id
  join promo p2 on ol.promo_id = p2.id
  where ol."no_order" = $1`;
  const values = [no_order];
  return db.query(query, values);
};

export const createOrder = (body: IorderBody): Promise<QueryResult<IdataOrder>> => {
  const query = `insert into order_list (product_id, promo_id, user_id, status) values ($1,$2,$3,$4)
      returning *`;
  const { product_id, promo_id, user_id, status } = body;
  const values = [product_id, promo_id, user_id, status];
  return db.query(query, values);
};

export const deleteOrder = (no_order: string): Promise<QueryResult<IdataOrder>> => {
  const query = `delete from order_list where no_order=$1`;
  const values = [no_order];
  return db.query(query, values);
};

export const updateOrder = (no_order: String, body: IorderBody): Promise<QueryResult<IdataOrder>> => {
  const query = `update order_list set status = $1, updated_at = now() where no_order = $2
      returning *`;
  const { status } = body;
  const values = [status, no_order];
  return db.query(query, values);
};
