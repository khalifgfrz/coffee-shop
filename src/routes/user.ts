import { Router } from "express";
import { createNewUser, getDetailUser, getUser, deleteExtUser, updateDetailUser, registerNewUser, loginUser, setPwd, changePwd, deletedUser } from "../handlers/user";
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
userRouter.delete("/delete", authorization(["admin", "user"]), deleteExtUser);

// Menghapus User Dari Admin
userRouter.delete("/:uuid", authorization(["admin"]), deletedUser);

// Mengupdate User
userRouter.patch("/settings", authorization(["admin", "user"]), singleUploader("image"), updateDetailUser);

// Edit Pwd
userRouter.patch("/resetpassword", authorization(["admin", "user"]), changePwd);

// Edit Pwd Dari Admin
userRouter.patch("/:uuid/pwd", authorization(["admin"]), setPwd);

export default userRouter;
