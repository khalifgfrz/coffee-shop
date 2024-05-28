import { Request, Response } from "express-serve-static-core";

import { getOnePromo, createPromo, getAllPromo, deletePromo, updateOnePromo } from "../repositories/promo";
import { IPromoBody, IPromoParams } from "../models/promo";

export const getPromo = async (req: Request, res: Response) => {
  try {
    const result = await getAllPromo();
    if (result.rows.length === 0) {
      return res.status(404).json({
        msg: "Promo tidak ditemukan",
        data: [],
      });
    }
    return res.status(200).json({
      msg: "Success",
      data: result.rows,
    });
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message);
    }
    return res.status(500).json({
      msg: "Error",
      err: "Internal Server Error",
    });
  }
};

export const getDetailPromo = async (req: Request<IPromoParams>, res: Response) => {
  const { uuid } = req.params;
  try {
    const result = await getOnePromo(uuid);
    if (result.rowCount === 0) {
      return res.status(404).json({
        msg: "Promo tidak ditemukan",
        data: [],
      });
    }
    return res.status(200).json({
      msg: "Success",
      data: result.rows,
    });
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message);
    }
    return res.status(500).json({
      msg: "Error",
      err: "Internal Server Error",
    });
  }
};

export const createNewPromo = async (req: Request<{}, {}, IPromoBody>, res: Response) => {
  try {
    const result = await createPromo(req.body);
    return res.status(201).json({
      msg: "success",
      data: result.rows,
    });
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message);
    }
    return res.status(500).json({
      msg: "Error",
      err: "Internal Server Error",
    });
  }
};

export const deleteExtPromo = async (req: Request<IPromoParams>, res: Response) => {
  const { uuid } = req.params;
  try {
    const result = await deletePromo(uuid);
    if (result.rowCount === 0) {
      return res.status(404).json({
        msg: "Promo tidak ditemukan",
        data: [],
      });
    }
    return res.status(200).json({
      msg: "Success",
      data: result.rows,
    });
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message);
    }
    return res.status(500).json({
      msg: "Error",
      err: "Internal Server Error",
    });
  }
};

export const updateDetailPromo = async (req: Request<IPromoParams, {}, IPromoBody>, res: Response) => {
  const { uuid } = req.params;
  try {
    const result = await updateOnePromo(req.body, uuid);
    if (result.rowCount === 0) {
      return res.status(404).json({
        msg: "Promo tidak ditemukan",
        data: [],
      });
    }
    return res.status(201).json({
      msg: "success",
      data: result.rows,
    });
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message);
    }
    return res.status(500).json({
      msg: "Error",
      err: "Internal Server Error",
    });
  }
};
