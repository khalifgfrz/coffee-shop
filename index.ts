import express, { Request, Response } from "express";
import * as dotenv from "dotenv";
import morgan from "morgan";
import cors, { CorsOptions } from "cors";
// import path from "path";

let path = "./.env.production";
// if (process.env.NODE_ENV == "production") path = "./.env.production";
dotenv.config({ path });

import router from "./src/routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// logger
const logger = morgan("dev");
app.use(logger);

// cors
const configs: CorsOptions = {
  origin: ["http://localhost:8080", "http://127.0.0.1:5500"],
  methods: ["POST", "PATCH"],
  allowedHeaders: ["Authorization", "x-headers"],
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
