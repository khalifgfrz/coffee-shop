import { Request, Response } from "express-serve-static-core";

import { getOnePromo, createPromo, getAllPromo, deletePromo, updateOnePromo, updateAllPromo } from "../repositories/promo";
import { IpromoBody, IpromoParams } from "../models/promo";

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
    if (err) {
      console.log((err as Error).message);
    }
    return res.status(500).json({
      msg: "Error",
      err: "Internal Server Error",
    });
  }
};

export const getDetailPromo = async (req: Request<IpromoParams>, res: Response) => {
  try {
    const result = await getOnePromo(req.params);
    if (result.rowCount === 0) {
      return res.status(404).json({
        msg: "Produk tidak ditemukan",
        data: [],
      });
    }
    return res.status(200).json({
      msg: "Success",
      data: result.rows,
    });
  } catch (err) {
    if (err) {
      console.log((err as Error).message);
    }
    return res.status(500).json({
      msg: "Error",
      err: "Internal Server Error",
    });
  }
};

export const createNewPromo = async (req: Request<{}, {}, IpromoBody>, res: Response) => {
  try {
    const result = await createPromo(req.body);
    return res.status(201).json({
      message: "success",
      data: result.rows,
    });
  } catch (err) {
    if (err) {
      console.log((err as Error).message);
    }
    return res.status(500).json({
      msg: "Error",
      err: "Internal Server Error",
    });
  }
};

export const deleteExtPromo = async (req: Request<IpromoParams>, res: Response) => {
  try {
    const result = await deletePromo(req.params);
    if (result.rowCount === 0) {
      return res.status(404).json({
        msg: "Produk tidak ditemukan",
        data: [],
      });
    }
    return res.status(200).json({
      msg: "Success",
      data: result,
    });
  } catch (err) {
    if (err) {
      console.log((err as Error).message);
    }
    return res.status(500).json({
      msg: "Error",
      err: "Internal Server Error",
    });
  }
};

export const updatePromo = async (req: Request<IpromoParams, {}, IpromoBody>, res: Response) => {
  try {
    const result = await updateAllPromo(req.params, req.body);
    if (result.rowCount === 0) {
      return res.status(404).json({
        msg: "Produk tidak ditemukan",
        data: [],
      });
    }
    return res.status(201).json({
      message: "success",
      data: result.rows,
    });
  } catch (err) {
    if (err) {
      console.log((err as Error).message);
    }
    return res.status(500).json({
      msg: "Error",
      err: "Internal Server Error",
    });
  }
};

export const updateDetailPromo = async (req: Request<IpromoParams, {}, IpromoBody>, res: Response) => {
  try {
    const result = await updateOnePromo(req.params, req.body);
    if (result.rowCount === 0) {
      return res.status(404).json({
        msg: "Produk tidak ditemukan",
        data: [],
      });
    }
    return res.status(201).json({
      message: "success",
      data: result.rows,
    });
  } catch (err) {
    if (err) {
      console.log((err as Error).message);
    }
    return res.status(500).json({
      msg: "Error",
      err: "Internal Server Error",
    });
  }
};
