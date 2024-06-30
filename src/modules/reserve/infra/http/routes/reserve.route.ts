import { Router } from "express";
import { container } from "tsyringe";
import ReserveController from "../controller/ReserveController";
import { validateReserve } from "../../schemas/CreateReserveValidation";

const reserveRouter = Router();
const reserveController = container.resolve(ReserveController);

reserveRouter.post("/", validateReserve, reserveController.create);
reserveRouter.get("/", reserveController.index);

export default reserveRouter;
