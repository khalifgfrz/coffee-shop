import { QueryResult } from "pg";

import db from "../configs/pg";
import { IDataProduct, IProductBody, IProductParams, IProductQuery } from "../models/product";

export const getAllProduct = (que: IProductQuery): Promise<QueryResult<IDataProduct>> => {
  let query = `select * from product`;
  const { product_name, price, category, sortBy, page } = que;
  const values = [];
  let condition = false;

  if (product_name) {
    query += " where product_name ilike $1";
    values.push(`%${product_name}%`);
    condition = true;
  }
  if (price) {
    query += condition ? " and price > $2" : " where price > $1";
    values.push(`${price}`);
    condition = true;
  }
  if (category) {
    query += condition ? " and category = $2" : " where category = $1";
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
  switch (page) {
    case "1":
      query += " limit 10 offset 0";
      break;
    case "2":
      query += " limit 10 offset 10";
      break;
    case "3":
      query += " limit 10 offset 20";
      break;
  }
  return db.query(query, values);
};

export const getOneProduct = (params: IProductParams): Promise<QueryResult<IDataProduct>> => {
  const query = `select * from product where uuid=$1`;
  const { uuid } = params;
  const values = [uuid];
  return db.query(query, values);
};

export const createProduct = (body: IProductBody): Promise<QueryResult<IDataProduct>> => {
  const query = `insert into product (product_name, price, category, description, product_size, method, stock) values ($1,$2,$3,$4,$5,$6,$7)
  returning product_name, price, category, description, product_size, method, stock`;
  const { product_name, price, category, description, product_size, method, stock } = body;
  const values = [product_name, price, category, description, product_size, method, stock];
  return db.query(query, values);
};

export const deleteProduct = (params: IProductParams): Promise<QueryResult<IDataProduct>> => {
  const query = `delete from product where uuid=$1
  returning product_name, price, category, description, product_size, method, stock`;
  const { uuid } = params;
  const values = [uuid];
  return db.query(query, values);
};

export const updateAllProduct = (params: IProductParams, body: IProductBody): Promise<QueryResult<IDataProduct>> => {
  const query = `update product set product_name = $1, price = $2, category = $3, description = $4, product_size = $5, method = $6, stock = $7, updated_at = now() where uuid = $8
  returning product_name, price, category, description, product_size, method, stock`;
  const { product_name, price, category, description, product_size, method, stock } = body;
  const { uuid } = params;
  const values = [product_name, price, category, description, product_size, method, stock, uuid];
  return db.query(query, values);
};

export const updateOneProduct = (params: IProductParams, body: IProductBody): Promise<QueryResult<IDataProduct>> => {
  let query = `update product set`;
  const { product_name, price, category, description, product_size, method, stock } = body;
  const { uuid } = params;
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
  return db.query(query, values);
};
