import { Request, Response } from "express-serve-static-core";
import bcrypt from "bcrypt";

import { getAllUser, getOneUser, createUser, deleteUser, updateOneUser, updateAllUser, registerUser, getPwdUser } from "../repositories/user";

import { IuserBody, IuserParams, IuserQuery, IuserResgisterBody, IuserLoginBody } from "../models/user";

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

export const loginUser = async (req: Request<{}, {}, IuserLoginBody>, res: Response) => {
  const { uuid, pwd } = req.body;
  try {
    const result = await getPwdUser(uuid);
    if (!result.rows.length) throw new Error("Siswa tidak ditemukan");
    const { pwd: hash, full_name } = result.rows[0];
    const isPwdValid = await bcrypt.compare(pwd, hash);
    if (!isPwdValid) throw new Error("Login Gagal");
    return res.status(200).json({
      msg: `Selamat datang, ${full_name}`,
    });
  } catch (err) {
    if (err instanceof Error) {
      if (/(invalid(.)+uuid(.)+)/g.test(err.message)) {
        return res.status(401).json({
          msg: "Error",
          err: "Siswa tidak ditemukan",
        });
      }
      return res.status(401).json({
        msg: "Error",
        err: "Unauthorized",
      });
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
