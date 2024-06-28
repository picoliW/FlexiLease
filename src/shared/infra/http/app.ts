import express from "express";
import routes from "./routes";
import { ErrorHandlerMiddleware } from "./middlewares/ErrorHandler";
import { NotFound } from "./middlewares/NotFound";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", routes);

app.use(ErrorHandlerMiddleware);
app.use(NotFound);

export { app };
