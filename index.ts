import express, { Request, Response } from "express";
import * as dotenv from "dotenv";
import morgan from "morgan";
import cors, { CorsOptions } from "cors";

dotenv.config();

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

app.get("/", (req: Request, res: Response) => {
  res.send("OK");
});

app.use(router);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
