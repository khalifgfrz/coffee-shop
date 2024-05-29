import { Router } from "express";
import { createNewProduct, deleteExtProduct, getDetailProduct, getProduct, updateDetailProduct } from "../handlers/product";
import { authorization } from "../middlewares/authorization";
import { multiUploader, singleUploader } from "../middlewares/upload";

const productRouter = Router();

// CRUD
// productRouter.get("/", getProduct);

productRouter.get("/", getProduct);

productRouter.get("/:uuid", getDetailProduct);
// Menambah Produk Baru
productRouter.post("/", authorization(["admin"]), multiUploader("image", 3), createNewProduct);
// Menghapus Produk
productRouter.delete("/:uuid", authorization(["admin"]), deleteExtProduct);
// Mengupdate Produk
productRouter.patch("/:uuid", authorization(["admin"]), multiUploader("image", 3), updateDetailProduct);

export default productRouter;
