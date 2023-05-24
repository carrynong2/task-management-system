import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import compression from "compression";
import helmet from "helmet";
import taskRouter from "./domain/tasks/task.controller.js";
import { connectMongoDB } from "./configs/db.config.js";
import { handlingResponseError } from "./util/utility.js";

connectMongoDB();
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());
app.use(compression());
app.use(helmet());

app.use("/api/v1/tasks", taskRouter);

app.use((req, res) => {
  return res.status(404).json({
    message: "Not Found",
  });
});

app.use((error, req, res, next) => handlingResponseError(error, req, res));

export default app;
