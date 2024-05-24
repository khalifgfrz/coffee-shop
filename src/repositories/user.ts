import { QueryResult } from "pg";

import db from "../configs/pg";
import { IdataUser, IuserBody, IuserParams, IuserQuery } from "../models/user";

export const getAllUser = (que: IuserQuery): Promise<QueryResult<IdataUser>> => {
  let query = `select * from "user"`;
  const { page } = que;
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
  return db.query(query);
};

export const getOneUser = (params: IuserParams): Promise<QueryResult<IdataUser>> => {
  const query = `select * from "user" where uuid=$1`;
  const { uuid } = params;
  const values = [uuid];
  return db.query(query, values);
};

export const createUser = (body: IuserBody): Promise<QueryResult<IdataUser>> => {
  const query = `insert into "user" (full_name, phone, address, email, "password", "role") values ($1,$2,$3,$4,$5,$6)
  returning full_name, phone, address, email, "role"`;
  const { full_name, phone, address, email, password, role } = body;
  const values = [full_name, phone, address, email, password, role];
  return db.query(query, values);
};

export const deleteUser = (params: IuserParams): Promise<QueryResult<IdataUser>> => {
  const query = `delete from "user" where uuid=$1
  returning full_name, phone, address, email, "role"`;
  const { uuid } = params;
  const values = [uuid];
  return db.query(query, values);
};

export const updateAllUser = (params: IuserParams, body: IuserBody): Promise<QueryResult<IdataUser>> => {
  const query = `update "user" set full_name = $1, phone = $2, address = $3, email = $4, "password" = $5, "role" = $6, updated_at = now() where uuid = $7
    returning returning full_name, phone, address, email, role`;
  const { full_name, phone, address, email, password, role } = body;
  const { uuid } = params;
  const values = [full_name, phone, address, email, password, role, uuid];
  return db.query(query, values);
};

export const updateOneUser = (params: IuserParams, body: IuserBody): Promise<QueryResult<IdataUser>> => {
  let query = `update "user" set`;
  const { full_name, phone, address, email, password, role } = body;
  const { uuid } = params;
  const values = [];
  if (full_name) {
    query += ` full_name = $1, updated_at = now() where uuid = $2
    returning full_name, phone, address, email, role`;
    values.push(`${full_name}`, `${uuid}`);
  }
  if (phone) {
    query += ` phone = $1, updated_at = now() where uuid = $2
    returning full_name, phone, address, email, role`;
    values.push(`${phone}`, `${uuid}`);
  }
  if (address) {
    query += ` address = $1, updated_at = now() where uuid = $2
    returning full_name, phone, address, email, role`;
    values.push(`${address}`, `${uuid}`);
  }
  if (email) {
    query += ` email = $1, updated_at = now() where uuid = $2
    returning full_name, phone, address, email, role`;
    values.push(`${email}`, `${uuid}`);
  }
  if (password) {
    query += ` "password" = $1, updated_at = now() where uuid = $2
    returning full_name, phone, address, email, role`;
    values.push(`${password}`, `${uuid}`);
  }
  if (role) {
    query += ` "role" = $1, updated_at = now() where uuid = $2
    returning full_name, phone, address, email, role`;
    values.push(`${role}`, `${uuid}`);
  }
  return db.query(query, values);
};
