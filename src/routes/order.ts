import { Router } from "express";
import { createNewOrder, deleteExtOrder, getDetailOrder, getOrder, updatedOrder } from "../handlers/order";
import { authorization } from "../middlewares/authorization";

const orderRouter = Router();

// CRUD
orderRouter.get("/", authorization(["admin"]), getOrder);

orderRouter.get("/:no_order", authorization(["admin", "user"]), getDetailOrder);
// Menambah Produk Baru
orderRouter.post("/", authorization(["admin", "user"]), createNewOrder);
// Menghapus Produk
orderRouter.delete("/:no_order", authorization(["admin"]), deleteExtOrder);
// Mengupdate Produk
orderRouter.patch("/:no_order", authorization(["admin"]), updatedOrder);

export default orderRouter;
