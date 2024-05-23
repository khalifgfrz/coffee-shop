import { Router } from "express";
import { createNewProduct, deleteExtProduct, getDetailProduct, getProduct, updatedProduct } from "../handlers/product";

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
productRouter.put("/:uuid", updatedProduct);

export default productRouter;
