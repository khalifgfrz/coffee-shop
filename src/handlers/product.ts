import { Request, Response } from "express-serve-static-core";

import { getAllProduct, getOneProduct, createProduct, deleteProduct, updateOneProduct, updateAllProduct } from "../repositories/product";
import { IproductBody, IproductParams, IproductQuery } from "../models/product";

export const getProduct = async (req: Request<{}, {}, {}, IproductQuery>, res: Response) => {
  try {
    const result = await getAllProduct(req.query);
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

export const getDetailProduct = async (req: Request<IproductParams>, res: Response) => {
  try {
    const result = await getOneProduct(req.params);
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

export const createNewProduct = async (req: Request<{}, {}, IproductBody>, res: Response) => {
  try {
    const result = await createProduct(req.body);
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

export const deleteExtProduct = async (req: Request<IproductParams>, res: Response) => {
  try {
    const result = await deleteProduct(req.params);
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

export const updateProduct = async (req: Request<IproductParams, {}, IproductBody>, res: Response) => {
  try {
    const result = await updateAllProduct(req.params, req.body);
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

export const updateDetailProduct = async (req: Request<IproductParams, {}, IproductBody>, res: Response) => {
  try {
    const result = await updateOneProduct(req.params, req.body);
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
