import { QueryResult } from "pg";

import db from "../configs/pg";
import { IdataProduct, IproductBody, IproductParams, IproductQuery } from "../models/product";

export const getAllProduct = (que: IproductQuery): Promise<QueryResult<IdataProduct>> => {
  let query = `select * from product`;
  const { product_name, price, category, sortName, latest, oldest, sortPrice, limit, offset } = que;
  const values = [];
  if (product_name) {
    query += " where product_name ilike $1";
    values.push(`%${product_name}%`);
    if (price) {
      query += " and price > $2";
      values.push(`${price}`);
      if (category) {
        query += " and category = $3";
        values.push(`${category}`);
      }
    } else if (category) {
      query += " and category = $2";
      values.push(`${category}`);
    }
  } else if (price) {
    query += " where price > $1";
    values.push(`${price}`);
    if (category) {
      query += " and category = $2";
      values.push(`${category}`);
    }
  } else if (category) {
    query += " where category = $1";
    values.push(`${category}`);
  }
  if (sortName) {
    query += " order by product_name asc";
  }
  if (oldest) {
    query += " order by updated_at asc, created_at asc";
  }
  if (latest) {
    query += " order by updated_at desc,created_at desc";
  }
  if (sortPrice) {
    query += " order by price asc";
  }
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

export const getOneProduct = (params: IproductParams): Promise<QueryResult<IdataProduct>> => {
  const query = `select * from product where uuid=$1`;
  const { uuid } = params;
  const values = [uuid];
  return db.query(query, values);
};

export const createProduct = (body: IproductBody): Promise<QueryResult<IdataProduct>> => {
  const query = `insert into product (product_name, price, category, description, product_size, method, stock) values ($1,$2,$3,$4,$5,$6,$7)
    returning *`;
  const { product_name, price, category, description, product_size, method, stock } = body;
  const values = [product_name, price, category, description, product_size, method, stock];
  return db.query(query, values);
};

export const deleteProduct = (params: IproductParams): Promise<QueryResult<IdataProduct>> => {
  const query = `delete from product where uuid=$1`;
  const { uuid } = params;
  const values = [uuid];
  return db.query(query, values);
};

export const updateProduct = (params: IproductParams, body: IproductBody): Promise<QueryResult<IdataProduct>> => {
  const query = `update product set product_name = $1, price = $2, category = $3, description = $4, product_size = $5, method = $6, stock = $7, updated_at = now() where uuid = $8
    returning *`;
  const { product_name, price, category, description, product_size, method, stock } = body;
  const { uuid } = params;
  const values = [product_name, price, category, description, product_size, method, stock, uuid];
  return db.query(query, values);
};
