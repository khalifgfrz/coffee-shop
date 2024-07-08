import { Router } from "express";
import { createNewUser, getDetailUser, getUser, deleteExtUser, updateDetailUser, registerNewUser, loginUser, setPwd, changePwd, deletedUser, setImageCloud } from "../handlers/user";
import { authorization } from "../middlewares/authorization";
import { singleCloudUploader } from "../middlewares/upload";

const userRouter = Router();

// CRUD
userRouter.get("/datauser", authorization(["admin"]), getUser);
userRouter.get("/", authorization(), getDetailUser);

// Menambah User Baru
userRouter.post("/createuser", authorization(["admin"]), createNewUser);

// Register Akun User
userRouter.post("/register", registerNewUser);

// Login Akun User
userRouter.post("/login", loginUser);

// Menghapus User
userRouter.delete("/delete", authorization(), deleteExtUser);

// Menghapus User Dari Admin
userRouter.delete("/:uuid", authorization(["admin"]), deletedUser);

// Mengupdate User
userRouter.patch("/settings", authorization(), singleCloudUploader("image"), updateDetailUser);

// Edit Image User via Cloudinary
userRouter.patch("/settings/upload", authorization(), singleCloudUploader("image"), setImageCloud);

// Edit Pwd
userRouter.patch("/resetpassword", authorization(), changePwd);

// Edit Pwd Dari Admin
userRouter.patch("/:uuid/pwd", authorization(["admin"]), setPwd);

export default userRouter;
