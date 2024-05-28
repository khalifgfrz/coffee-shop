import { Router } from "express";
import { createNewPromo, deleteExtPromo, getDetailPromo, getPromo, updateDetailPromo } from "../handlers/promo";
import { authorization } from "../middlewares/authorization";

const promoRouter = Router();

// CRUD
promoRouter.get("/", getPromo);

promoRouter.get("/:uuid", getDetailPromo);

// Menambah Promo Baru
promoRouter.post("/", authorization(["admin"]), createNewPromo);
// Menghapus Promo
promoRouter.delete("/:uuid", authorization(["admin"]), deleteExtPromo);
// Mengupdate Promo
promoRouter.patch("/:uuid", authorization(["admin"]), updateDetailPromo);

export default promoRouter;
