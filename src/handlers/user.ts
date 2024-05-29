import { Request, Response } from "express-serve-static-core";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { getAllUser, getOneUser, createUser, deleteUser, updateOneUser, registerUser, getPwdUser, setPwdUser, getTotalUser } from "../repositories/user";

import { IUserBody, IUserParams, IUserQuery, IUserRegisterBody, IUserLoginBody } from "../models/user";
import { IAuthResponse, IUserResponse } from "../models/response";
import { IPayload } from "../models/payload";
import { jwtOptions } from "../middlewares/authorization";
import getUserLink from "../helpers/getUserLink";

export const getUser = async (req: Request<{}, {}, {}, IUserQuery>, res: Response<IUserResponse>) => {
  try {
    const result = await getAllUser(req.query);
    if (result.rowCount === 0) {
      return res.status(404).json({
        msg: "User tidak ditemukan",
        data: [],
      });
    }
    const dataUser = await getTotalUser();
    const page = parseInt((req.query.page as string) || "1");
    const totalData = parseInt(dataUser.rows[0].total_user);
    const totalPage = Math.ceil(totalData / 4);
    return res.status(200).json({
      msg: "Success",
      data: result.rows,
      meta: {
        totalData,
        totalPage,
        page,
        prevLink: page > 1 ? getUserLink(req, "previous") : null,
        nextLink: page != totalPage ? getUserLink(req, "next") : null,
      },
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

export const getDetailUser = async (req: Request, res: Response<IUserResponse>) => {
  const { uuid } = req.userPayload as IPayload;
  try {
    const result = await getOneUser(uuid as string);
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

export const createNewUser = async (req: Request<{}, {}, IUserBody>, res: Response<IUserResponse>) => {
  try {
    const result = await createUser(req.body);
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

export const deleteExtUser = async (req: Request<IUserParams>, res: Response<IUserResponse>) => {
  const { uuid } = req.userPayload as IPayload;
  try {
    const result = await deleteUser(uuid as string);
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

export const registerNewUser = async (req: Request<{}, {}, IUserRegisterBody>, res: Response<IUserResponse>) => {
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

// Authenticaton
export const loginUser = async (req: Request<{}, {}, IUserLoginBody>, res: Response<IAuthResponse>) => {
  const { uuid, role, pwd } = req.body;
  try {
    // user login menggunakan uuid
    const result = await getPwdUser(uuid);
    // handling jika password tidak ditemukan
    if (!result.rows.length) throw new Error("User tidak ditemukan");
    const { pwd: hash, full_name } = result.rows[0];
    // mengecek apakah password sama
    const isPwdValid = await bcrypt.compare(pwd, hash);
    // handling jika password salah
    if (!isPwdValid) throw new Error("Login Gagal");
    // jika pwd benar, buatkan token
    const payload: IPayload = {
      uuid, //uuid: uuid
      role, //role: roles
    };
    const token = jwt.sign(payload, <string>process.env.JWT_SECRET, jwtOptions);
    return res.status(200).json({
      msg: `Selamat datang, ${full_name}`,
      data: [{ token }],
    });
  } catch (err) {
    if (err instanceof Error) {
      if (/(invalid(.)+uuid(.)+)/g.test(err.message)) {
        return res.status(401).json({
          msg: "Error",
          err: "User tidak ditemukan",
        });
      }
      return res.status(401).json({
        msg: "Error",
        err: err.message,
      });
    }
    return res.status(500).json({
      msg: "Error",
      err: "Internal Server Error",
    });
  }
};

export const updateDetailUser = async (req: Request<{ uuid: string }, {}, IUserBody>, res: Response<IUserResponse>) => {
  const { uuid } = req.userPayload as IPayload;
  const { file } = req;
  if (!file)
    return res.status(400).json({
      msg: "File not found",
      err: "Only receive input for image files (JPG, PNG, JPEG)",
    });
  try {
    const result = await updateOneUser(req.body, uuid as string, file.filename);
    if (result.rowCount === 0) {
      return res.status(404).json({
        msg: "User tidak ditemukan",
        data: [],
      });
    }
    return res.status(201).json({
      msg: "success",
      data: result.rows,
    });
  } catch (err) {
    if (err instanceof Error) {
      if (/(invalid(.)+uuid(.)+)/g.test(err.message)) {
        return res.status(401).json({
          msg: "Error",
          err: "User tidak ditemukan",
        });
      }
      console.log(err.message);
    }
    return res.status(500).json({
      msg: "Error",
      err: "Internal Server Error",
    });
  }
};

export const setPwd = async (req: Request<{ uuid: string }, {}, { pwd: string }>, res: Response<IUserResponse>) => {
  const { pwd } = req.body;
  const { uuid } = req.params;
  try {
    const salt = await bcrypt.genSalt();
    const hashed = await bcrypt.hash(pwd, salt);
    await setPwdUser(hashed, uuid);
    res.status(200).json({
      msg: "Berhasil diubah",
    });
  } catch (err) {
    if (err instanceof Error) {
      if (/(invalid(.)+uuid(.)+)/g.test(err.message)) {
        return res.status(401).json({
          msg: "Error",
          err: "User tidak ditemukan",
        });
      }
      console.log(err.message);
    }
    return res.status(500).json({
      msg: "Error",
      err: "Internal Server Error",
    });
  }
};

export const changePwd = async (req: Request<{ uuid: string }, {}, { pwd: string }>, res: Response<IUserResponse>) => {
  const { pwd } = req.body;
  const { uuid } = req.userPayload as IPayload;
  try {
    const salt = await bcrypt.genSalt();
    const hashed = await bcrypt.hash(pwd, salt);
    await setPwdUser(hashed, uuid as string);
    res.status(200).json({
      msg: "Berhasil diubah",
    });
  } catch (err) {
    if (err instanceof Error) {
      if (/(invalid(.)+uuid(.)+)/g.test(err.message)) {
        return res.status(401).json({
          msg: "Error",
          err: "User tidak ditemukan",
        });
      }
      console.log(err.message);
    }
    return res.status(500).json({
      msg: "Error",
      err: "Internal Server Error",
    });
  }
};

export const deletedUser = async (req: Request<IUserParams>, res: Response<IUserResponse>) => {
  const { uuid } = req.params;
  try {
    const result = await deleteUser(uuid);
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
