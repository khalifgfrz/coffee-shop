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

export const getOneUser = (email: string): Promise<QueryResult<IDataUser>> => {
  const query = `select * from "user" where email=$1`;
  const values = [email];
  return db.query(query, values);
};

export const createUser = (body: IUserBody): Promise<QueryResult<IDataUser>> => {
  const query = `insert into "user" (full_name, phone, address, email, "role") values ($1,$2,$3,$4,$5,$6)
  returning uuid, full_name, phone, address, email, role, created_at, updated_at, "role"`;
  const { full_name, phone, address, email, role } = body;
  const values = [full_name, phone, address, email, role];
  return db.query(query, values);
};

export const registerUser = (full_name: string, email: string, hashedPassword: string): Promise<QueryResult<IDataUser>> => {
  const query = `insert into "user" (full_name, email, pwd, "role") values ($1,$2,$3,'user')
  returning full_name, email, "role"`;
  const values = [full_name, email, hashedPassword];
  return db.query(query, values);
};

export const getPwdUser = (email: string): Promise<QueryResult<{ role: string; pwd: string }>> => {
  const query = `select full_name, "role", pwd from "user" where email = $1`;
  const values = [email];
  return db.query(query, values);
};

export const deleteUser = (email: string): Promise<QueryResult<IDataUser>> => {
  const query = `delete from "user" where email=$1
  returning full_name, phone, address, email, "role"`;
  const values = [email];
  return db.query(query, values);
};

export const deleteUserFromAdmin = (uuid: string): Promise<QueryResult<IDataUser>> => {
  const query = `delete from "user" where uuid=$1
  returning full_name, phone, address, email, "role"`;
  const values = [uuid];
  return db.query(query, values);
};

export const updateOneUser = (body: IUserBody, emailparams: string, imgUrl?: string): Promise<QueryResult<IDataUser>> => {
  let query = `update "user" set`;
  const { full_name, phone, address, email } = body;
  const values = [];
  let condition = false;

  if (full_name) {
    query += ` full_name = $${values.length + 1}`;
    values.push(`${full_name}`);
    condition = true;
  }
  if (phone) {
    query += condition ? "," : "";
    query += ` phone = $${values.length + 1}`;
    values.push(`${phone}`);
    condition = true;
  }
  if (address) {
    query += condition ? "," : "";
    query += ` address = $${values.length + 1}`;
    values.push(`${address}`);
    condition = true;
  }
  if (email) {
    query += condition ? "," : "";
    query += ` email = $${values.length + 1}`;
    values.push(`${email}`);
    condition = true;
  }
  if (imgUrl) {
    query += condition ? "," : "";
    query += ` image = $${values.length + 1}`;
    values.push(`${imgUrl}`);
    condition = true;
  }
  query += `, updated_at = now() where email = $${values.length + 1} returning full_name, phone, address, email, image`;
  values.push(`${emailparams}`);
  console.log(query, values);
  return db.query(query, values);
};

export const setImageUser = (email: string, imgUrl?: string): Promise<QueryResult<IDataUser>> => {
  const query = `update "user" set image=$1 where email=$2 returning email, image`;
  const values: (string | null)[] = [];
  if (imgUrl) values.push(`${imgUrl}`);
  if (!imgUrl) values.push(null);
  values.push(email);
  return db.query(query, values);
};

export const setPwdUser = (hashedPwd: string, email: string): Promise<QueryResult<{}>> => {
  const query = `update "user" set pwd = $1, updated_at = now() where email = $2`;
  const values = [hashedPwd, email];
  return db.query(query, values);
};

export const getTotalUser = (): Promise<QueryResult<{ total_user: string }>> => {
  const query = `select count(*) as "total_user" from "user"`;
  return db.query(query);
};
