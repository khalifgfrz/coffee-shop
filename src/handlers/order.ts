import { Request, Response } from "express-serve-static-core";

import { createOrder, deleteOrder, getAllOrder, getOneOrder, getTotalOrder, updateOrder } from "../repositories/order";
import { IOrderParams, IOrderBody, IOrderQuery, IOrderWithDetailsBody, IDataOrder } from "../models/order";
import getOrderLink from "../helpers/getOrderLink";
import { IOrderResponse, IOrderWithDetailsResponse } from "../models/response";
import db from "../configs/pg";
import { createDetail, getOneOrderDetails } from "../repositories/orderDetails";

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
    const client = await db.connect();
    try {
      await client.query("BEGIN");

      const getOrderResult = await getOneOrder(uuid, client);
      const order_id = getOrderResult.rows[0].id;

      const getDetailResult = await getOneOrderDetails(order_id, client);

      const getOrdersWithDetails = getOrderResult.rows.map((order) => ({
        ...order,
        products: getDetailResult.rows,
      }));
      return res.status(201).json({
        msg: "Success",
        data: getOrdersWithDetails,
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

export const createNewOrder = async (req: Request<{}, {}, IOrderWithDetailsBody>, res: Response<IOrderWithDetailsResponse>) => {
  const { products } = req.body;
  try {
    const client = await db.connect();
    try {
      await client.query("BEGIN");

      const orderResult = await createOrder(req.body, client);
      const order_id = orderResult.rows[0].id;

      const detailResult = await createDetail(order_id, products, client);

      await client.query("COMMIT");

      const ordersWithDetails = orderResult.rows.map((order) => ({
        ...order,
        products: detailResult.rows,
      }));
      return res.status(201).json({
        msg: "Success",
        data: ordersWithDetails,
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
