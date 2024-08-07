import { Router } from "express";
import { createNewOrder, deleteExtOrder, getDetailOrder, getOrder, orderHistory, updatedOrder } from "../handlers/order";
import { authorization } from "../middlewares/authorization";

const orderRouter = Router();

// CRUD
orderRouter.get("/", authorization(["admin"]), getOrder);

orderRouter.get("/:uuid", authorization(), getDetailOrder);
orderRouter.get("/get/history", authorization(), orderHistory);
// Menambah Order Baru
orderRouter.post("/new", authorization(), createNewOrder);
// Menghapus Order
orderRouter.delete("/:uuid", authorization(["admin"]), deleteExtOrder);
// Mengupdate Order
orderRouter.patch("/:uuid", authorization(["admin"]), updatedOrder);

export default orderRouter;
