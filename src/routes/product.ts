import { Router } from "express";
import { createNewProduct, deleteExtProduct, getDetailProduct, getProduct, updateDetailProduct, updateProduct } from "../handlers/product";

const productRouter = Router();

// CRUD
// productRouter.get("/", getProduct);

productRouter.get("/", getProduct);

productRouter.get("/:uuid", getDetailProduct);
// Menambah Produk Baru
productRouter.post("/", createNewProduct);
// Menghapus Produk
productRouter.delete("/:uuid", deleteExtProduct);
// Mengupdate Produk
productRouter.put("/:uuid", updateProduct);

productRouter.patch("/:uuid", updateDetailProduct);

export default productRouter;
