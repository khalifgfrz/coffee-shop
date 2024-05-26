import { QueryResult } from "pg";

import db from "../configs/pg";

import { IDataPromo, IPromoBody, IPromoParams } from "../models/promo";

export const getAllPromo = (): Promise<QueryResult<IDataPromo>> => {
  const query = `select uuid, promo_name, discount_type, flat_amount, percent_amount from promo`;
  return db.query(query);
};

export const getOnePromo = (params: IPromoParams): Promise<QueryResult<IDataPromo>> => {
  const query = `select uuid, promo_name, discount_type, flat_amount, percent_amount from promo where uuid=$1`;
  const { uuid } = params;
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

export const deletePromo = (params: IPromoParams): Promise<QueryResult<IDataPromo>> => {
  const query = `delete from promo where uuid=$1
  returning promo_name, discount_type, flat_amount, percent_amount`;
  const { uuid } = params;
  const values = [uuid];
  return db.query(query, values);
};

export const updateAllPromo = (params: IPromoParams, body: IPromoBody): Promise<QueryResult<IDataPromo>> => {
  const query = `update promo set promo_name = $1, discount_type = $2, flat_amount = $3, percent_amount = $4, updated_at = now() where uuid = $5
    returning promo_name, discount_type, flat_amount, percent_amount`;
  const { promo_name, discount_type, flat_amount, percent_amount } = body;
  const { uuid } = params;
  const values = [promo_name, discount_type, flat_amount, percent_amount, uuid];
  return db.query(query, values);
};

export const updateOnePromo = (params: IPromoParams, body: IPromoBody): Promise<QueryResult<IDataPromo>> => {
  let query = `update promo set`;
  const { promo_name, discount_type, flat_amount, percent_amount } = body;
  const { uuid } = params;
  const values = [];
  if (promo_name) {
    query += ` promo_name = $1, updated_at = now() where uuid = $2
    returning promo_name, discount_type, flat_amount, percent_amount`;
    values.push(`${promo_name}`, `${uuid}`);
  }
  if (discount_type) {
    query += ` discount_type = $1, updated_at = now() where uuid = $2
    returning promo_name, discount_type, flat_amount, percent_amount`;
    values.push(`${discount_type}`, `${uuid}`);
  }
  if (flat_amount) {
    query += ` flat_amount = $1, updated_at = now() where uuid = $2
    returning promo_name, discount_type, flat_amount, percent_amount`;
    values.push(`${flat_amount}`, `${uuid}`);
  }
  if (percent_amount) {
    query += ` percent_amount = $1, updated_at = now() where uuid = $2
    returning promo_name, discount_type, flat_amount, percent_amount`;
    values.push(`${percent_amount}`, `${uuid}`);
  }
  return db.query(query, values);
};
