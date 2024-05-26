import { Request, Response } from "express-serve-static-core";

import { createOrder, deleteOrder, getAllOrder, getOneOrder, updateOrder } from "../repositories/order";
import { IOrderParams, IOrderBody, IOrderQuery } from "../models/order";

export const getOrder = async (req: Request<{}, {}, {}, IOrderQuery>, res: Response) => {
  try {
    const result = await getAllOrder(req.query);
    if (result.rowCount === 0) {
      return res.status(404).json({
        msg: "Pesanan tidak ditemukan",
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

export const getDetailOrder = async (req: Request<IOrderParams>, res: Response) => {
  const { no_order } = req.params;
  try {
    const result = await getOneOrder(no_order);
    if (result.rowCount === 0) {
      return res.status(404).json({
        msg: "Pesanan tidak ditemukan",
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

export const createNewOrder = async (req: Request<{}, {}, IOrderBody>, res: Response) => {
  try {
    const result = await createOrder(req.body);
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

export const deleteExtOrder = async (req: Request<IOrderParams>, res: Response) => {
  const { no_order } = req.params;
  try {
    const result = await deleteOrder(no_order);
    if (result.rowCount === 0) {
      return res.status(404).json({
        msg: "Pesanan tidak ditemukan",
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

export const updatedOrder = async (req: Request<IOrderParams, {}, IOrderBody>, res: Response) => {
  try {
    const { no_order } = req.params;
    const result = await updateOrder(no_order, req.body);
    if (result.rowCount === 0) {
      return res.status(404).json({
        msg: "Pesanan tidak ditemukan",
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
