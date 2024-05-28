import { Router } from "express";
import { createNewUser, getDetailUser, getUser, deleteExtUser, updateDetailUser, registerNewUser, loginUser, setPwd, changePwd } from "../handlers/user";
import { authorization } from "../middlewares/authorization";
import { singleUploader } from "../middlewares/upload";

const userRouter = Router();

// CRUD
userRouter.get("/datauser", authorization(["admin"]), getUser);
userRouter.get("/", authorization(["admin", "user"]), getDetailUser);

// Menambah User Baru
userRouter.post("/createuser", authorization(["admin"]), createNewUser);

// Register Akun User
userRouter.post("/register", registerNewUser);

// Login Akun User
userRouter.post("/login", loginUser);

// Menghapus User
userRouter.delete("/:uuid", deleteExtUser);

// Mengupdate User
userRouter.patch("/settings", authorization(["admin", "user"]), singleUploader("image"), updateDetailUser);

// Change Pwd
userRouter.patch("/resetpassword", authorization(["admin", "user"]), changePwd);

// Edit Pwd User
userRouter.patch("/:uuid/pwd", setPwd);

export default userRouter;
