import { Router } from "express";
import { createNewOrder, deleteExtOrder, getDetailOrder, getOrder, updatedOrder } from "../handlers/order";

const orderRouter = Router();

// CRUD
orderRouter.get("/", getOrder);

orderRouter.get("/:no_order", getDetailOrder);
// Menambah Produk Baru
orderRouter.post("/", createNewOrder);
// Menghapus Produk
orderRouter.delete("/:no_order", deleteExtOrder);
// Mengupdate Produk
orderRouter.put("/:no_order", updatedOrder);

export default orderRouter;
