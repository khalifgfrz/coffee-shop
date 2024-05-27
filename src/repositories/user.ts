import { QueryResult } from "pg";

import db from "../configs/pg";
import { IDataUser, IUserBody, IUserParams, IUserQuery } from "../models/user";

export const getAllUser = (que: IUserQuery): Promise<QueryResult<IDataUser>> => {
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

export const getOneUser = (uuid: string): Promise<QueryResult<IDataUser>> => {
  const query = `select * from "user" where uuid=$1`;
  const values = [uuid];
  return db.query(query, values);
};

export const createUser = (body: IUserBody): Promise<QueryResult<IDataUser>> => {
  const query = `insert into "user" (full_name, phone, address, email, "role") values ($1,$2,$3,$4,$5,$6)
  returning full_name, phone, address, email, role, created_at, updated_at, "role"`;
  const { full_name, phone, address, email, role } = body;
  const values = [full_name, phone, address, email, role];
  return db.query(query, values);
};

export const registerUser = (body: IUserBody, hashedPassword: string): Promise<QueryResult<IDataUser>> => {
  const query = `insert into "user" (full_name, phone, address, email, "role", pwd) values ($1,$2,$3,$4,$5,$6)
  returning full_name, phone, address, email, "role"`;
  const { full_name, phone, address, email, role } = body;
  const values = [full_name, phone, address, email, role, hashedPassword];
  return db.query(query, values);
};

export const getPwdUser = (uuid: string): Promise<QueryResult<{ full_name: string; pwd: string }>> => {
  const query = `select full_name, pwd from "user" where uuid = $1`;
  const values = [uuid];
  return db.query(query, values);
};

export const deleteUser = (uuid: string): Promise<QueryResult<IDataUser>> => {
  const query = `delete from "user" where uuid=$1
  returning full_name, phone, address, email, "role"`;
  const values = [uuid];
  return db.query(query, values);
};

export const updateAllUser = (body: IUserBody, uuid: string): Promise<QueryResult<IDataUser>> => {
  const query = `update "user" set full_name = $1, phone = $2, address = $3, email = $4, "role" = $5, updated_at = now() where uuid = $6
    returning full_name, phone, address, email, role`;
  const { full_name, phone, address, email, role } = body;
  const values = [full_name, phone, address, email, role, uuid];
  return db.query(query, values);
};

export const updateOneUser = (body: IUserBody, uuid: string): Promise<QueryResult<IDataUser>> => {
  let query = `update "user" set`;
  const { full_name, phone, address, email, role } = body;
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
  if (role) {
    query += ` "role" = $1, updated_at = now() where uuid = $2
    returning full_name, phone, address, email, role`;
    values.push(`${role}`, `${uuid}`);
  }
  return db.query(query, values);
};

export const setPwdUser = (hashedPwd: string, uuid: string): Promise<QueryResult<{}>> => {
  const query = `update "user" set pwd = $1, updated_at = now() where uuid = $2`;
  const values = [hashedPwd, uuid];
  return db.query(query, values);
};
