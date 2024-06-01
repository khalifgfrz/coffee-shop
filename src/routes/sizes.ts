import { Router } from "express";
import { createNewSizes, deleteExtSizes, getDetailSizes, getSizes, updateDetailSizes } from "../handlers/sizes";
import { authorization } from "../middlewares/authorization";

const sizesRouter = Router();

// CRUD
sizesRouter.get("/", authorization(["admin"]), getSizes);

sizesRouter.get("/:uuid", authorization(["admin"]), getDetailSizes);

// Menambah Size Baru
sizesRouter.post("/", authorization(["admin"]), createNewSizes);
// Menghapus Size
sizesRouter.delete("/:uuid", authorization(["admin"]), deleteExtSizes);
// Mengupdate Size
sizesRouter.patch("/:uuid", authorization(["admin"]), updateDetailSizes);

export default sizesRouter;
