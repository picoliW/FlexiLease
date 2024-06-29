import { container } from "tsyringe";
import { Router } from "express";
import { CarController } from "../controllers/CarController";
import { createCarSchema } from "../../schemas/CreateCarSchema";
import { DeleteCarSchema } from "../../schemas/DeleteCarSchema";

const carsRouter = Router();
const carsController = container.resolve(CarController);

carsRouter.post("/", createCarSchema, carsController.create);
carsRouter.get("/", carsController.index);

carsRouter.delete(
  "/:id",
  (req, res, next) => {
    const { error } = DeleteCarSchema.validate(req.params);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    next();
  },
  carsController.delete,
);

export default carsRouter;
