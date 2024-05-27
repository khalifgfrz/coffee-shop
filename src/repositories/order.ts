import { QueryResult } from "pg";

import db from "../configs/pg";
import { IDataOrder, IOrderBody, IOrderQuery } from "../models/order";

export const getAllOrder = ({ page }: IOrderQuery): Promise<QueryResult<IDataOrder>> => {
  let query = `select ol.id, ol.no_order, ol."date", p.product_name, ol.status, p.price, p2.promo_name from order_list ol
  join product p on ol.product_id = p.id
  join promo p2 on ol.promo_id = p2.id`;
  const values = [];
  if (page) {
    const offset = (parseInt(page) - 1) * 4;
    query += ` limit 4 offset $${values.length + 1}`;
    values.push(offset);
  }
  return db.query(query, values);
};

export const getOneOrder = (no_order: string): Promise<QueryResult<IDataOrder>> => {
  const query = `select ol.id, ol.no_order, ol."date", p.product_name, ol.status, p.price, p2.promo_name from order_list ol
  join product p on ol.product_id = p.id
  join promo p2 on ol.promo_id = p2.id
  where ol."no_order" = $1`;
  const values = [no_order];
  return db.query(query, values);
};

export const createOrder = (body: IOrderBody): Promise<QueryResult<IDataOrder>> => {
  const query = `insert into order_list (product_id, promo_id, user_id, status) values ($1,$2,$3,$4)
  returning no_order, product_id, promo_id, user_id, status`;
  const { product_id, promo_id, user_id, status } = body;
  const values = [product_id, promo_id, user_id, status];
  return db.query(query, values);
};

export const deleteOrder = (no_order: string): Promise<QueryResult<IDataOrder>> => {
  const query = `delete from order_list where no_order=$1
  returning no_order, product_id, promo_id, user_id, status`;
  const values = [no_order];
  return db.query(query, values);
};

export const updateOrder = (body: IOrderBody, no_order: string): Promise<QueryResult<IDataOrder>> => {
  const query = `update order_list set status = $1, updated_at = now() where no_order = $2
  returning no_order, product_id, promo_id, user_id, status`;
  const { status } = body;
  const values = [status, no_order];
  return db.query(query, values);
};

export const getTotalOrder = (): Promise<QueryResult<{ total_order: string }>> => {
  const query = `select count(*) as "total_order" from order_list`;
  return db.query(query);
};
