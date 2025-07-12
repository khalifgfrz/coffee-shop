import { Router } from "express";
import { getFavorite } from "../handlers/favorite";

const favoriteRouter = Router();

// CRUD
favoriteRouter.get("/", getFavorite);

export default favoriteRouter;
