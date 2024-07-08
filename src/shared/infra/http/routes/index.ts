import carsRouter from "@modules/cars/infra/http/routes/Car.route";
import usersRouter from "@modules/users/infra/http/routes/User.route";
import authRouter from "@modules/users/infra/http/routes/auth.route";
import { Router } from "express";
import ensureAuthenticated from "../middlewares/AuthMiddleware";
import reserveRouter from "@modules/reserve/infra/http/routes/reserve.route";

const routes = Router();

routes.use("/car", ensureAuthenticated, carsRouter);

routes.use("/user", usersRouter);

routes.use("/authenticate", authRouter);

routes.use("/reserve", ensureAuthenticated, reserveRouter);

routes.get("/", (request, response) => {
  return response.json("Hello world");
});

export default routes;
