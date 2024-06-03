import { Request, Response } from "express-serve-static-core";

import { IOrderDetailsResponse } from "../models/response";
import { getAllOrderDetails, getOneOrderDetails } from "../repositories/orderDetails";
import { IOrderDetailsParams } from "../models/orderDetails";

export const getAllDetails = async (req: Request, res: Response<IOrderDetailsResponse>) => {
  try {
    const result = await getAllOrderDetails();
    if (result.rows.length === 0) {
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

export const getOrderDetails = async (req: Request<IOrderDetailsParams>, res: Response<IOrderDetailsResponse>) => {
  const { order_id } = req.params;
  try {
    const result = await getOneOrderDetails(order_id);
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
