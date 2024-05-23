import { Request, Response } from "express-serve-static-core";

import { getAllUser, getOneUser, createUser, deleteUser, updateUser } from "../repositories/user";

import { IuserBody, IuserParams, IuserQuery } from "../models/user";

export const getUser = async (req: Request<{}, {}, {}, IuserQuery>, res: Response) => {
  try {
    const result = await getAllUser(req.query);
    if (result.rows.length === 0) {
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

export const getDetailUser = async (req: Request<IuserParams>, res: Response) => {
  try {
    const result = await getOneUser(req.params);
    if (result.rowCount === 0) {
      return res.status(404).json({
        msg: "User tidak ditemukan",
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

export const createNewUser = async (req: Request<{}, {}, IuserBody>, res: Response) => {
  try {
    const result = await createUser(req.body);
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

export const deleteExtUser = async (req: Request<IuserParams>, res: Response) => {
  try {
    const result = await deleteUser(req.params);
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

export const updatedUser = async (req: Request<IuserParams, {}, IuserBody>, res: Response) => {
  try {
    const result = await updateUser(req.params, req.body);
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
