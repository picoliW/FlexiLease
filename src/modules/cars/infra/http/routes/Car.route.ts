import { container } from "tsyringe";
import { Router } from "express";
import { CarController } from "../controllers/CarController";
import { createCarSchema } from "../../schemas/CreateCarSchema";

const carsRouter = Router();
const carsController = container.resolve(CarController);

carsRouter.post("/", createCarSchema, carsController.create);

export default carsRouter;
