import { Router } from "express";
import { createNewUser, getDetailUser, getUser, deleteExtUser, updateDetailUser, updateUser } from "../handlers/user";

const userRouter = Router();

// CRUD
userRouter.get("/", getUser);

userRouter.get("/:uuid", getDetailUser);

// Menambah User Baru
userRouter.post("/", createNewUser);
// Menghapus User
userRouter.delete("/:uuid", deleteExtUser);
// Mengupdate User
userRouter.put("/:uuid", updateUser);

userRouter.patch("/:uuid", updateDetailUser);

export default userRouter;
