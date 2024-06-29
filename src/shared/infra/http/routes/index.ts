import carsRouter from "@modules/cars/infra/http/routes/Car.route";
import { Router } from "express";

const routes = Router();

routes.use("/car", carsRouter);

routes.get("/", (request, response) => {
  return response.json("Hello world");
});

export default routes;
