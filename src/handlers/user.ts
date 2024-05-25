import { Request, Response } from "express-serve-static-core";
import bcrypt from "bcrypt";

import { getAllUser, getOneUser, createUser, deleteUser, updateOneUser, updateAllUser, registerUser } from "../repositories/user";

import { IuserBody, IuserParams, IuserQuery, IuserResgisterBody } from "../models/user";

export const getUser = async (req: Request<{}, {}, {}, IuserQuery>, res: Response) => {
  try {
    const result = await getAllUser(req.query);
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
    if (err instanceof Error) {
      console.log(err.message);
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
    if (err instanceof Error) {
      console.log(err.message);
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
    if (err instanceof Error) {
      console.log(err.message);
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
        msg: "User tidak ditemukan",
        data: [],
      });
    }
    return res.status(200).json({
      msg: "Success",
      data: result,
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

export const registerNewUser = async (req: Request<{}, {}, IuserResgisterBody>, res: Response) => {
  const { pwd } = req.body;
  try {
    // membuat hashed password
    const salt = await bcrypt.genSalt();
    const hashed = await bcrypt.hash(pwd, salt);
    // menyimpan kedalam db
    const result = await registerUser(req.body, hashed);
    return res.status(201).json({
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

export const updateUser = async (req: Request<IuserParams, {}, IuserBody>, res: Response) => {
  try {
    const result = await updateAllUser(req.params, req.body);
    if (result.rowCount === 0) {
      return res.status(404).json({
        msg: "User tidak ditemukan",
        data: [],
      });
    }
    return res.status(201).json({
      message: "success",
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

export const updateDetailUser = async (req: Request<IuserParams, {}, IuserBody>, res: Response) => {
  try {
    const result = await updateOneUser(req.params, req.body);
    if (result.rowCount === 0) {
      return res.status(404).json({
        msg: "User tidak ditemukan",
        data: [],
      });
    }
    return res.status(201).json({
      message: "success",
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
