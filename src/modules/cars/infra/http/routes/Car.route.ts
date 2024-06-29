import { container } from "tsyringe";
import { Router } from "express";
import { CarController } from "../controllers/CarController";
import { CreateCarSchema } from "../../schemas/CreateCarSchema";
import { UpdateCarSchema } from "../../schemas/UpdateCarSchema";
import { validateObjectIdMIddleware } from "@shared/infra/http/middlewares/ValidateDeleteCar";

const carsRouter = Router();
const carsController = container.resolve(CarController);

carsRouter.post("/", CreateCarSchema, carsController.create);
carsRouter.get("/", carsController.index);
carsRouter.delete("/:id", validateObjectIdMIddleware, carsController.delete);
carsRouter.put(
  "/:id",
  UpdateCarSchema,
  validateObjectIdMIddleware,
  carsController.update,
);
carsRouter.get("/:id", validateObjectIdMIddleware, carsController.show);

carsRouter.patch(
  "/:id/accessories/:accessoryId",
  carsController.updateAccessory,
);

export default carsRouter;
