import { Router } from "express";
import { container } from "tsyringe";
import UsersController from "../controller/UserController";
import { CreateUserSchema } from "../../schemas/CreateUserSchema";
import CPFValidator from "@shared/infra/http/middlewares/CPFValidator";

const usersRouter = Router();
const usersController = container.resolve(UsersController);

usersRouter.post("/", CreateUserSchema, CPFValidator, usersController.create);
usersRouter.get("/", usersController.index);

export default usersRouter;
