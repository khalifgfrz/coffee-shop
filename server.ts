import express, { Request, Response } from "express";
import * as dotenv from "dotenv";
import morgan from "morgan";
import cors, { CorsOptions } from "cors";
// import multer from "multer";
// import path from "path";

let path = "./.env.production";
// if (process.env.NODE_ENV == "production") path = "./.env.production";
dotenv.config({ path });

import router from "./src/routes";

const app = express();
// const upload = multer();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(upload.none());

// logger
const logger = morgan("dev");
app.use(logger);

// cors
const configs: CorsOptions = {
  origin: ["http://localhost:8080", "http://127.0.0.1:5500", "http://localhost:5173", "https://coffee-shop-fe-react.vercel.app"],
  methods: ["POST", "PATCH"],
  allowedHeaders: ["Authorization", "x-headers", "content-type"],
};
app.use(cors(configs));

// untuk mengakses static file
app.use(express.static("./public"));

app.get("/", (req: Request, res: Response) => {
  res.send("OK");
});

app.use(router);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});

export default app;
