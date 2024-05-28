import { Router } from "express";
import { createNewUser, getDetailUser, getUser, deleteExtUser, updateDetailUser, updateUser, registerNewUser, loginUser, setPwd } from "../handlers/user";
import { authorization } from "../middlewares/authorization";

const userRouter = Router();

// CRUD
userRouter.get("/", getUser);
userRouter.get("/detail", authorization(["admin", "user"]), getDetailUser);

// Menambah User Baru
userRouter.post("/", createNewUser);

// Register Akun User
userRouter.post("/register", registerNewUser);

// Login Akun User
userRouter.post("/login", loginUser);

// Menghapus User
userRouter.delete("/:uuid", deleteExtUser);

// Mengupdate User
userRouter.put("/:uuid", updateUser);
userRouter.patch("/:uuid", updateDetailUser);

// Edit Pwd User
userRouter.patch("/:uuid/pwd", setPwd);

export default userRouter;
