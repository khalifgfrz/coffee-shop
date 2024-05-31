import { Request, Response } from "express-serve-static-core";

import { createOrder, deleteOrder, getAllOrder, getOneOrder, getTotalOrder, updateOrder } from "../repositories/order";
import { IOrderParams, IOrderBody, IOrderQuery } from "../models/order";
import getOrderLink from "../helpers/getOrderLink";
import { IOrderResponse } from "../models/response";
import db from "../configs/pg";

export const getOrder = async (req: Request<{}, {}, {}, IOrderQuery>, res: Response<IOrderResponse>) => {
  try {
    const result = await getAllOrder(req.query);
    if (result.rowCount === 0) {
      return res.status(404).json({
        msg: "Pesanan tidak ditemukan",
        data: [],
      });
    }
    const dataOrder = await getTotalOrder();
    const page = parseInt((req.query.page as string) || "1");
    const totalData = parseInt(dataOrder.rows[0].total_order);
    const totalPage = Math.ceil(totalData / 4);
    return res.status(200).json({
      msg: "Success",
      data: result.rows,
      meta: {
        totalData,
        totalPage,
        page,
        prevLink: page > 1 ? getOrderLink(req, "previous") : null,
        nextLink: page != totalPage ? getOrderLink(req, "next") : null,
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

export const getDetailOrder = async (req: Request<IOrderParams>, res: Response<IOrderResponse>) => {
  const { uuid } = req.params;
  try {
    const result = await getOneOrder(uuid);
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

export const createNewOrder = async (req: Request<{}, {}, IOrderBody>, res: Response<IOrderResponse>) => {
  const { product_ids, promo_id, user_id } = req.body;
  try {
    const client = await db.connect();
    try {
      await client.query("BEGIN");

      const result = await createOrder(product_ids, promo_id, user_id, client);

      await client.query("COMMIT");

      return res.status(201).json({
        msg: "success",
        data: result.rows,
      });
    } catch (err) {
      await client.query("ROLLBACK");
      throw err;
    } finally {
      client.release();
    }
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

export const deleteExtOrder = async (req: Request<IOrderParams>, res: Response<IOrderResponse>) => {
  const { uuid } = req.params;
  try {
    const result = await deleteOrder(uuid);
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

export const updatedOrder = async (req: Request<IOrderParams, {}, IOrderBody>, res: Response<IOrderResponse>) => {
  try {
    const { status } = req.body;
    const { uuid } = req.params;
    const result = await updateOrder(status, uuid);
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
