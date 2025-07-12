import { Request, Response } from "express";
import { getAllFavorite } from "../repositories/favorite";
import { IFavoriteResponse } from "../models/response";

export const getFavorite = async (req: Request, res: Response<IFavoriteResponse>) => {
  try {
    const result = await getAllFavorite();
    if (result.rows.length === 0) {
      return res.status(404).json({
        msg: "Favorite tidak ditemukan",
        data: [],
      });
    }
    return res.status(200).json({
      msg: "Success",
      data: result.rows,
    });
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message);
    }
    return res.status(500).json({
      msg: "Error",
      err: "Internal Server Error",
    });
  }
};
