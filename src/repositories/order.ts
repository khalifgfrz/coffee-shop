import { Pool, PoolClient, QueryResult } from "pg";

import db from "../configs/pg";
import { IDataOrder, IOrderBody, IOrderQuery } from "../models/order";

export const getAllOrder = ({ page }: IOrderQuery): Promise<QueryResult<IDataOrder>> => {
  let query = `select ol.id, u.full_name, u.address, ol.subtotal, ol.tax, u.phone, p.payment_method, d.delivery_method,
  d.minimum_distance as distance, d.added_cost as "added cost", p2.promo_name, ol.status, ol.grand_total from order_list ol
    join "user" u on ol.user_id = u.id
    join payments p on ol.payment_id = p.id
    join deliveries d on ol.delivery_id = d.id
    join promo p2 on ol.promo_id = p2.id`;
  const values = [];
  if (page) {
    const offset = (parseInt(page) - 1) * 4;
    query += ` limit 4 offset $${values.length + 1}`;
    values.push(offset);
  }
  return db.query(query, values);
};

export const getOneOrder = (uuid: string, pgConn: Pool | PoolClient): Promise<QueryResult<IDataOrder>> => {
  const query = `select ol.id, u.full_name, u.address, ol.subtotal, ol.tax, u.phone, p.payment_method, d.delivery_method,
  d.minimum_distance as distance, d.added_cost as "added cost", ol.status, ol.grand_total from order_list ol
    join "user" u on ol.user_id = u.id
    join payments p on ol.payment_id = p.id
    join deliveries d on ol.delivery_id = d.id
  where ol.uuid = $1`;
  const values = [uuid];
  return pgConn.query(query, values);
};

export const historyOrder = (email: string, pgConn: Pool | PoolClient): Promise<QueryResult<IDataOrder>> => {
  const query = `select ol.id, ol.created_at, ol.grand_total, ol.status from order_list ol
    join "user" u on ol.user_id = u.id
  where u.email = $1`;
  const values = [email];
  return pgConn.query(query, values);
};

export const createOrder = (body: IOrderBody, pgConn: Pool | PoolClient): Promise<QueryResult<IDataOrder>> => {
  let query = `insert into order_list (user_id, subtotal, tax, payment_id, delivery_id, promo_id, status, grand_total) values ($1,$2,$3,$4,$5,$6,$7,$8)
  returning id, uuid, user_id, subtotal, tax, payment_id, delivery_id, promo_id, status, grand_total`;
  const { user_id, subtotal, tax, payment_id, delivery_id, promo_id, status, grand_total } = body;
  const values = [user_id, subtotal, tax, payment_id, delivery_id, promo_id, status, grand_total];
  return pgConn.query(query, values);
};

export const deleteOrder = (uuid: string): Promise<QueryResult<IDataOrder>> => {
  const query = `delete from order_list where uuid=$1
  returning user_id, subtotal, tax, payment_id, delivery_id, promo_id, status, grand_total`;
  const values = [uuid];
  return db.query(query, values);
};

export const updateOrder = (status: string, no_order: string): Promise<QueryResult<IDataOrder>> => {
  const query = `update order_list set status = $1, updated_at = now() where no_order = $2
  returning no_order, product_id, promo_id, user_id, status`;
  const values = [status, no_order];
  return db.query(query, values);
};

export const getTotalOrder = (): Promise<QueryResult<{ total_order: string }>> => {
  const query = `select count(*) as "total_order" from order_list`;
  return db.query(query);
};
