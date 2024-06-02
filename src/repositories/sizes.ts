import { QueryResult } from "pg";

import db from "../configs/pg";

import { IDataSizes, ISizesBody } from "../models/sizes";

export const getAllSizes = (): Promise<QueryResult<IDataSizes>> => {
  const query = `select * from sizes`;
  return db.query(query);
};

export const getOneSizes = (uuid: string): Promise<QueryResult<IDataSizes>> => {
  const query = `select * from sizes where uuid=$1`;
  const values = [uuid];
  return db.query(query, values);
};

export const createSizes = (body: ISizesBody): Promise<QueryResult<IDataSizes>> => {
  const query = `insert into sizes ("size", added_cost) values ($1,$2)
  returning "size", added_cost`;
  const { size, added_cost } = body;
  const values = [size, added_cost];
  return db.query(query, values);
};

export const deleteSizes = (uuid: string): Promise<QueryResult<IDataSizes>> => {
  const query = `delete from sizes where uuid=$1
  returning "size", added_cost`;
  const values = [uuid];
  return db.query(query, values);
};

export const updateOneSizes = (body: ISizesBody, uuid: string): Promise<QueryResult<IDataSizes>> => {
  let query = `update sizes set`;
  const { size, added_cost } = body;
  const values = [];
  let condition = false;

  if (size) {
    query += ` "size = $${values.length + 1}`;
    values.push(`${size}`);
    condition = true;
  }
  if (added_cost) {
    query += condition ? "," : "";
    query += ` added_cost = $${values.length + 1}`;
    values.push(`${added_cost}`);
    condition = true;
  }
  query += `, updated_at = now() where uuid = $${values.length + 1}
  returning "size", added_cost`;
  values.push(`${uuid}`);
  return db.query(query, values);
};
