import { Request, Response } from "express-serve-static-core";

import { getAllProduct, getOneProduct, createProduct, deleteProduct, updateOneProduct, getTotalProduct } from "../repositories/product";
import { IProductBody, IProductParams, IProductQuery } from "../models/product";
import getProductLink from "../helpers/getProductLink";

export const getProduct = async (req: Request<{}, {}, {}, IProductQuery>, res: Response) => {
  try {
    const result = await getAllProduct(req.query);
    if (result.rowCount === 0) {
      return res.status(404).json({
        msg: "Produk tidak ditemukan",
        data: [],
      });
    }
    const dataProduct = await getTotalProduct();
    const page = parseInt((req.query.page as string) || "1");
    const totalData = parseInt(dataProduct.rows[0].total_product);
    const totalPage = Math.ceil(totalData / 5);
    return res.status(200).json({
      msg: "Success",
      data: result.rows,
      meta: {
        totalData,
        totalPage,
        page,
        prevLink: page > 1 ? getProductLink(req, "previous") : null,
        nextLink: page != totalPage ? getProductLink(req, "next") : null,
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

export const getDetailProduct = async (req: Request<IProductParams>, res: Response) => {
  const { uuid } = req.params;
  try {
    const result = await getOneProduct(uuid);
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
    if (err instanceof Error) {
      console.log(err.message);
    }
    return res.status(500).json({
      msg: "Error",
      err: "Internal Server Error",
    });
  }
};

export const createNewProduct = async (req: Request<{}, {}, IProductBody>, res: Response) => {
  const { file } = req;
  if (!file)
    return res.status(400).json({
      msg: "File not found",
      err: "Only receive input for image files (JPG, PNG, JPEG)",
    });
  try {
    const result = await createProduct(req.body, file.filename);
    return res.status(201).json({
      msg: "success",
      data: result.rows,
    });
  } catch (err) {
    if (err instanceof Error) {
      if (/(invalid(.)+uuid(.)+)/g.test(err.message)) {
        return res.status(401).json({
          msg: "Error",
          err: "Produk tidak ditemukan",
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

export const deleteExtProduct = async (req: Request<IProductParams>, res: Response) => {
  const { uuid } = req.params;
  try {
    const result = await deleteProduct(uuid);
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
    if (err instanceof Error) {
      console.log(err.message);
    }
    return res.status(500).json({
      msg: "Error",
      err: "Internal Server Error",
    });
  }
};

export const updateDetailProduct = async (req: Request<{ uuid: string }, {}, IProductBody>, res: Response) => {
  const {
    file,
    params: { uuid },
  } = req;
  if (!file)
    return res.status(400).json({
      msg: "File not found",
      err: "Only receive input for image files (JPG, PNG, JPEG)",
    });
  try {
    const result = await updateOneProduct(req.body, uuid, file.filename);
    if (result.rowCount === 0) {
      return res.status(404).json({
        msg: "Produk tidak ditemukan",
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
