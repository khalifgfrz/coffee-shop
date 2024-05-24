import { Router } from "express";
import { createNewPromo, deleteExtPromo, getDetailPromo, getPromo, updateDetailPromo, updatePromo } from "../handlers/promo";

const promoRouter = Router();

// CRUD
promoRouter.get("/", getPromo);

promoRouter.get("/:uuid", getDetailPromo);

// Menambah Promo Baru
promoRouter.post("/", createNewPromo);
// Menghapus Promo
promoRouter.delete("/:uuid", deleteExtPromo);
// Mengupdate Promo
promoRouter.put("/:uuid", updatePromo);

promoRouter.patch("/:uuid", updateDetailPromo);

export default promoRouter;
