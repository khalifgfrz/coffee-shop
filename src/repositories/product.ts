import { QueryResult } from "pg";

import db from "../configs/pg";
import { IDataProduct, IProductBody, IProductQuery } from "../models/product";

export const getAllProduct = (que: IProductQuery): Promise<QueryResult<IDataProduct>> => {
  let query = `select * from product`;
  const { product_name, price, category, sortBy, page } = que;
  const values = [];
  let condition = false;

  if (product_name) {
    query += ` where product_name ilike $${values.length + 1}`;
    values.push(`%${product_name}%`);
    condition = true;
  }
  if (price) {
    query += condition ? " and " : " where ";
    query += ` price > $${values.length + 1}`;
    values.push(`${price}`);
    condition = true;
  }
  if (category) {
    query += condition ? " and " : " where ";
    query += ` category = $${values.length + 1}`;
    values.push(`${category}`);
    condition = true;
  }

  switch (sortBy) {
    case "product_name":
      query += " order by product_name asc";
      break;
    case "price":
      query += " order by price asc";
      break;
    case "latest":
      query += " order by created_at desc";
      break;
    case "oldest":
      query += " order by created_at asc";
      break;
  }

  if (page) {
    const offset = (parseInt(page) - 1) * 5;
    query += ` limit 5 offset $${values.length + 1}`;
    values.push(offset);
  }
  return db.query(query, values);
};

export const getOneProduct = (uuid: string): Promise<QueryResult<IDataProduct>> => {
  const query = `select * from product where uuid=$1`;
  const values = [uuid];
  return db.query(query, values);
};

export const createProduct = (body: IProductBody, imgUrl?: string): Promise<QueryResult<IDataProduct>> => {
  const query = `insert into product (product_name, price, category, description, product_size, method, stock, image) values ($1,$2,$3,$4,$5,$6,$7,$8)
  returning product_name, price, category, description, product_size, method, stock, image`;
  const { product_name, price, category, description, product_size, method, stock } = body;
  const values = [product_name, price, category, description, product_size, method, stock, `/imgs/${imgUrl}`];
  return db.query(query, values);
};

export const deleteProduct = (uuid: string): Promise<QueryResult<IDataProduct>> => {
  const query = `delete from product where uuid=$1
  returning product_name, price, category, description, product_size, method, stock`;
  const values = [uuid];
  return db.query(query, values);
};

export const updateOneProduct = (body: IProductBody, uuid: string, imgUrl?: string): Promise<QueryResult<IDataProduct>> => {
  let query = `update product set`;
  const { product_name, price, category, description, product_size, method, stock } = body;
  const values = [];
  if (product_name) {
    query += ` product_name = $1, updated_at = now() where uuid = $2
    returning product_name, price, category, description, product_size, method, stock`;
    values.push(`${product_name}`, `${uuid}`);
  }
  if (price) {
    query += ` price = $1, updated_at = now() where uuid = $2
    returning product_name, price, category, description, product_size, method, stock`;
    values.push(`${price}`, `${uuid}`);
  }
  if (category) {
    query += ` category = $1, updated_at = now() where uuid = $2
    returning product_name, price, category, description, product_size, method, stock`;
    values.push(`${category}`, `${uuid}`);
  }
  if (description) {
    query += ` description = $1, updated_at = now() where uuid = $2
    returning product_name, price, category, description, product_size, method, stock`;
    values.push(`${description}`, `${uuid}`);
  }
  if (product_size) {
    query += ` product_size = $1, updated_at = now() where uuid = $2
    returning product_name, price, category, description, product_size, method, stock`;
    values.push(`${product_size}`, `${uuid}`);
  }
  if (method) {
    query += ` method = $1, updated_at = now() where uuid = $2
    returning product_name, price, category, description, product_size, method, stock`;
    values.push(`${method}`, `${uuid}`);
  }
  if (stock) {
    query += ` stock = $1, updated_at = now() where uuid = $2
    returning product_name, price, category, description, product_size, method, stock`;
    values.push(`${stock}`, `${uuid}`);
  }
  if (imgUrl) {
    query += ` image=$1, updated_at = now() where uuid=$2 returning uuid, image`;
    values.push(`/imgs/${imgUrl}`, `${uuid}`);
  }
  return db.query(query, values);
};

export const getTotalProduct = (): Promise<QueryResult<{ total_product: string }>> => {
  const query = `select count(*) as "total_product" from product`;
  return db.query(query);
};
