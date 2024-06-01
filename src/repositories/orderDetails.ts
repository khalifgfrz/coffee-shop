import { Pool, PoolClient, QueryResult } from "pg";

import { IOrderDetailsData } from "../models/orderDetails";

export const registerApplicant = (size_id: number, order_id: number, product_ids: number[], qty: number, subtotal: number, pgConn: Pool | PoolClient): Promise<QueryResult<IOrderDetailsData>> => {
  let query = `insert into order_details (size_id, order_id, product_id, qty, subtotal) values `;
  const values: number[] = [];
  for (const product_id of product_ids) {
    if (values.length) query += ",";
    query += `($${values.length + 1}, $${values.length + 2}, $${values.length + 3}, $${values.length + 4})`;
    values.push(size_id, order_id, product_id, qty, subtotal);
  }
  query += " returning id, size_id, order_id, product_id, qty, subtotal";
  return pgConn.query(query, values);
};
