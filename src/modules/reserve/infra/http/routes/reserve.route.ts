import { Router } from "express";
import { container } from "tsyringe";
import ReserveController from "../controller/ReserveController";
import { validateReserve } from "../../schemas/CreateReserveValidation";
import { validateObjectIdMIddleware } from "@shared/infra/http/middlewares/ValidateDeleteCar";

const reserveRouter = Router();
const reserveController = container.resolve(ReserveController);

reserveRouter.post("/", validateReserve, reserveController.create);
reserveRouter.get("/", reserveController.index);
reserveRouter.get("/:id", validateObjectIdMIddleware, reserveController.show);

export default reserveRouter;
