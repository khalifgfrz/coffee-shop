import { Pool, PoolClient, QueryResult } from "pg";

import { IOrderDetailsData } from "../models/orderDetails";

export const createDetail = (order_id: number, size_id: number, product_ids: number[], qty: number, pgConn: Pool | PoolClient): Promise<QueryResult<IOrderDetailsData>> => {
  let query = `insert into order_details (order_id, size_id, product_id, qty) values `;
  const values: number[] = [];
  for (const product_id of product_ids) {
    if (values.length) query += ",";
    query += `($${values.length + 1}, $${values.length + 2}, $${values.length + 3}, $${values.length + 4})`;
    values.push(order_id, size_id, product_id, qty);
  }
  query += " returning id, order_id, size_id, product_id, qty";
  return pgConn.query(query, values);
};
