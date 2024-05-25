import { Router } from "express";
import { createNewUser, getDetailUser, getUser, deleteExtUser, updateDetailUser, updateUser, registerNewUser } from "../handlers/user";

const userRouter = Router();

// CRUD
userRouter.get("/", getUser);

userRouter.get("/:uuid", getDetailUser);

// Menambah User Baru
userRouter.post("/", createNewUser);
// Register Akun User
userRouter.post("/new", registerNewUser);
// Menghapus User
userRouter.delete("/:uuid", deleteExtUser);
// Mengupdate User
userRouter.put("/:uuid", updateUser);

userRouter.patch("/:uuid", updateDetailUser);

export default userRouter;
