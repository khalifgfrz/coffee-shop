import { Router } from "express";
import { getAllDetails, getOrderDetails } from "../handlers/orderDetails";

const orderDetailsRouter = Router();

// CRUD
orderDetailsRouter.get("/", getAllDetails);

orderDetailsRouter.get("/:order_id", getOrderDetails);

export default orderDetailsRouter;
