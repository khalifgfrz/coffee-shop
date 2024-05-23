import express, { Request, Response } from "express";
import * as dotenv from "dotenv";

dotenv.config();

import router from "./src/routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("OK");
});

app.use(router);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
