import { Router } from "express";
import { createNewProduct, deleteExtProduct, getDetailProduct, getProduct, updateDetailProduct } from "../handlers/product";
import { authorization } from "../middlewares/authorization";
import { singleUploader } from "../middlewares/upload";

const productRouter = Router();

// CRUD
// productRouter.get("/", getProduct);

productRouter.get("/", getProduct);

productRouter.get("/:uuid", getDetailProduct);
// Menambah Produk Baru
productRouter.post("/", authorization(["admin"]), singleUploader("image"), createNewProduct);
// Menghapus Produk
productRouter.delete("/:uuid", authorization(["admin"]), deleteExtProduct);
// Mengupdate Produk
productRouter.patch("/:uuid", authorization(["admin"]), singleUploader("image"), updateDetailProduct);

export default productRouter;
