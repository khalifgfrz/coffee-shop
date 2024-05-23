import { QueryResult } from "pg";

import db from "../configs/pg";

import { IdataPromo, IpromoBody, IpromoParams } from "../models/promo";

export const getAllPromo = (): Promise<QueryResult<IdataPromo>> => {
  const query = `select * from promo`;
  return db.query(query);
};

export const getOnePromo = (params: IpromoParams): Promise<QueryResult<IdataPromo>> => {
  const query = `select * from promo where uuid=$1`;
  const { uuid } = params;
  const values = [uuid];
  return db.query(query, values);
};

export const createPromo = (body: IpromoBody): Promise<QueryResult<IdataPromo>> => {
  const query = `insert into promo (promo_name, discount_type, flat_amount, percent_amount) values ($1,$2,$3,$4)
    returning *`;
  const { promo_name, discount_type, flat_amount, percent_amount } = body;
  const values = [promo_name, discount_type, flat_amount, percent_amount];
  return db.query(query, values);
};

export const deletePromo = (params: IpromoParams): Promise<QueryResult<IdataPromo>> => {
  const query = `delete from promo where uuid=$1`;
  const { uuid } = params;
  const values = [uuid];
  return db.query(query, values);
};

export const updatePromo = (params: IpromoParams, body: IpromoBody): Promise<QueryResult<IdataPromo>> => {
  const query = `update promo set promo_name = $1, discount_type = $2, flat_amount = $3, percent_amount = $4, updated_at = now() where uuid = $5
    returning *`;
  const { promo_name, discount_type, flat_amount, percent_amount } = body;
  const { uuid } = params;
  const values = [promo_name, discount_type, flat_amount, percent_amount, uuid];
  return db.query(query, values);
};
