import { Router } from "express";
import { createNewProduct, deleteExtProduct, getDetailProduct, getProduct, setImageCloud, updateDetailProduct } from "../handlers/product";
import { authorization } from "../middlewares/authorization";
import { singleCloudUploader, singleUploader } from "../middlewares/upload";

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
productRouter.patch("/:uuid", authorization(["admin"]), updateDetailProduct);
// Edit Image Product via Cloudinary
productRouter.patch("/:uuid/upload", authorization(), singleCloudUploader("image"), setImageCloud);

export default productRouter;
