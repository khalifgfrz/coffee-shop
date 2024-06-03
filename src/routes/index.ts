import { Router } from "express";

import productRouter from "./product";
import promoRouter from "./promo";
import orderRouter from "./order";
import userRouter from "./user";
import sizesRouter from "./sizes";
import orderDetailsRouter from "./orderDetails";

const mainRouter = Router();

mainRouter.use("/product", productRouter);
mainRouter.use("/promo", promoRouter);
mainRouter.use("/order", orderRouter);
mainRouter.use("/orderdetails", orderDetailsRouter);
mainRouter.use("/user", userRouter);
mainRouter.use("/sizes", sizesRouter);

export default mainRouter;
