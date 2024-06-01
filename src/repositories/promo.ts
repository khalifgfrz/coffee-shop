import { QueryResult } from "pg";

import db from "../configs/pg";

import { IDataPromo, IPromoBody } from "../models/promo";

export const getAllPromo = (): Promise<QueryResult<IDataPromo>> => {
  const query = `select * from promo`;
  return db.query(query);
};

export const getOnePromo = (uuid: string): Promise<QueryResult<IDataPromo>> => {
  const query = `select * from promo where uuid=$1`;
  const values = [uuid];
  return db.query(query, values);
};

export const createPromo = (body: IPromoBody): Promise<QueryResult<IDataPromo>> => {
  const query = `insert into promo (promo_name, discount_type, flat_amount, percent_amount) values ($1,$2,$3,$4)
  returning promo_name, discount_type, flat_amount, percent_amount`;
  const { promo_name, discount_type, flat_amount, percent_amount } = body;
  const values = [promo_name, discount_type, flat_amount, percent_amount];
  return db.query(query, values);
};

export const deletePromo = (uuid: string): Promise<QueryResult<IDataPromo>> => {
  const query = `delete from promo where uuid=$1
  returning promo_name, discount_type, flat_amount, percent_amount`;
  const values = [uuid];
  return db.query(query, values);
};

export const updateOnePromo = (body: IPromoBody, uuid: string): Promise<QueryResult<IDataPromo>> => {
  let query = `update promo set`;
  const { promo_name, discount_type, flat_amount, percent_amount } = body;
  const values = [];
  let condition = false;

  if (promo_name) {
    query += ` promo_name = $${values.length + 1}`;
    values.push(`${promo_name}`);
    condition = true;
  }
  if (discount_type) {
    query += condition ? "," : "";
    query += ` discount_type = $${values.length + 1}`;
    values.push(`${discount_type}`);
    condition = true;
  }
  if (flat_amount) {
    query += condition ? "," : "";
    query += ` flat_amount = $${values.length + 1}`;
    values.push(`${flat_amount}`);
    condition = true;
  }
  if (percent_amount) {
    query += condition ? "," : "";
    query += ` percent_amount = $${values.length + 1}`;
    values.push(`${percent_amount}`);
    condition = true;
  }
  query += `, updated_at = now() where uuid = $${values.length + 1}
  returning promo_name, discount_type, flat_amount, percent_amount`;
  values.push(`${uuid}`);
  return db.query(query, values);
};
