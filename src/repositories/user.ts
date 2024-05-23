import { QueryResult } from "pg";

import db from "../configs/pg";
import { IdataUser, IuserBody, IuserParams, IuserQuery } from "../models/user";

export const getAllUser = (que: IuserQuery): Promise<QueryResult<IdataUser>> => {
  let query = `select * from "user"`;
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

export const getOneUser = (params: IuserParams): Promise<QueryResult<IdataUser>> => {
  const query = `select * from "user" where uuid=$1`;
  const { uuid } = params;
  const values = [uuid];
  return db.query(query, values);
};

export const createUser = (body: IuserBody): Promise<QueryResult<IdataUser>> => {
  const query = `insert into "user" (full_name, phone, address, email, "password", "role") values ($1,$2,$3,$4,$5,$6)
    returning *`;
  const { full_name, phone, address, email, password, role } = body;
  const values = [full_name, phone, address, email, password, role];
  return db.query(query, values);
};

export const deleteUser = (params: IuserParams): Promise<QueryResult<IdataUser>> => {
  const query = `delete from "user" where uuid=$1`;
  const { uuid } = params;
  const values = [uuid];
  return db.query(query, values);
};

export const updateUser = (params: IuserParams, body: IuserBody): Promise<QueryResult<IdataUser>> => {
  const query = `update "user" set full_name = $1, phone = $2, address = $3, email = $4, "password" = $5, "role" = $6, updated_at = now() where uuid = $7
    returning *`;
  const { full_name, phone, address, email, password, role } = body;
  const { uuid } = params;
  const values = [full_name, phone, address, email, password, role, uuid];
  return db.query(query, values);
};
