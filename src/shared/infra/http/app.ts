import express, { NextFunction, Request, Response } from "express";
import { errors } from "celebrate";
import routes from "./routes";
import { BadRequestError } from "src/shared/errors/BadRequestError";
import { NotFoundError } from "src/shared/errors/NotFoundError";
import { ValidationError } from "src/shared/errors/ValidationError";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

app.use(errors());

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (
      error instanceof BadRequestError ||
      error instanceof NotFoundError ||
      error instanceof ValidationError
    ) {
      return response.status(error.statusCode).json({
        status: "error",
        message: error.message,
      });
    }

    return response.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  },
);

export { app };
