import { Request, Response } from "express-serve-static-core";

import { getOneSizes, createSizes, getAllSizes, deleteSizes, updateOneSizes } from "../repositories/sizes";
import { ISizesBody, ISizesParams } from "../models/sizes";
import { ISizesResponse } from "../models/response";

export const getSizes = async (req: Request, res: Response<ISizesResponse>) => {
  try {
    const result = await getAllSizes();
    if (result.rows.length === 0) {
      return res.status(404).json({
        msg: "Size tidak ditemukan",
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

export const getDetailSizes = async (req: Request<ISizesParams>, res: Response<ISizesResponse>) => {
  const { uuid } = req.params;
  try {
    const result = await getOneSizes(uuid);
    if (result.rowCount === 0) {
      return res.status(404).json({
        msg: "Size tidak ditemukan",
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

export const createNewSizes = async (req: Request<{}, {}, ISizesBody>, res: Response<ISizesResponse>) => {
  try {
    const result = await createSizes(req.body);
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

export const deleteExtSizes = async (req: Request<ISizesParams>, res: Response<ISizesResponse>) => {
  const { uuid } = req.params;
  try {
    const result = await deleteSizes(uuid);
    if (result.rowCount === 0) {
      return res.status(404).json({
        msg: "Size tidak ditemukan",
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

export const updateDetailSizes = async (req: Request<ISizesParams, {}, ISizesBody>, res: Response<ISizesResponse>) => {
  const { uuid } = req.params;
  try {
    const result = await updateOneSizes(req.body, uuid);
    if (result.rowCount === 0) {
      return res.status(404).json({
        msg: "Size tidak ditemukan",
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
