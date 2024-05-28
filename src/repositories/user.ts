import { QueryResult } from "pg";

import db from "../configs/pg";
import { IDataUser, IUserBody, IUserQuery } from "../models/user";

export const getAllUser = ({ page }: IUserQuery): Promise<QueryResult<IDataUser>> => {
  let query = `select * from "user" order by id asc`;
  const values = [];
  if (page) {
    const offset = (parseInt(page) - 1) * 4;
    query += ` limit 4 offset $${values.length + 1}`;
    values.push(offset);
  }
  return db.query(query, values);
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

export const updateOneUser = (body: IUserBody, uuid: string, imgUrl?: string): Promise<QueryResult<IDataUser>> => {
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
  if (imgUrl) {
    query += ` image=$1, updated_at = now() where uuid=$2 returning uuid, image`;
    values.push(`/imgs/${imgUrl}`, `${uuid}`);
  }
  return db.query(query, values);
};

export const setPwdUser = (hashedPwd: string, uuid: string): Promise<QueryResult<{}>> => {
  const query = `update "user" set pwd = $1, updated_at = now() where uuid = $2`;
  const values = [hashedPwd, uuid];
  return db.query(query, values);
};

export const getTotalUser = (): Promise<QueryResult<{ total_user: string }>> => {
  const query = `select count(*) as "total_user" from "user"`;
  return db.query(query);
};
