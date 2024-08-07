import { Pool, PoolClient, QueryResult } from "pg";

import { IOrderDetailsData } from "../models/orderDetails";

export const getOneOrderDetails = (order_id: number, pgConn: Pool | PoolClient): Promise<QueryResult<IOrderDetailsData>> => {
  const query = `select od.order_id, p.image, p.product_name, p.price, s.size, s.added_cost, od.qty, ol.subtotal from order_details od
    join product p on od.product_id = p.id
    join sizes s on od.size_id = s.id
    join order_list ol on od.order_id = ol.id
    where od.order_id=$1`;
  const values = [order_id];
  return pgConn.query(query, values);
};

export const createDetail = (
  order_id: number,
  products: {
    product_id: number;
    size_id: number;
    qty: number;
  }[],
  pgConn: Pool | PoolClient
): Promise<QueryResult<IOrderDetailsData>> => {
  let query = `insert into order_details (order_id, size_id, product_id, qty) values `;
  const values: number[] = [];
  for (const product of products) {
    if (values.length) query += ",";
    query += `($${values.length + 1}, $${values.length + 2}, $${values.length + 3}, $${values.length + 4})`;
    values.push(order_id, product.size_id, product.product_id, product.qty);
    console.log(query, values);
  }

  query += " returning order_id,size_id, product_id, qty";

  return pgConn.query(query, values);
};
