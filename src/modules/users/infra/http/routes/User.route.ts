import { Router } from "express";
import { container } from "tsyringe";
import UsersController from "../controller/UserController";
import { CreateUserSchema } from "../../schemas/CreateUserSchema";
import CPFValidator from "@shared/infra/http/middlewares/CPFValidator";
import { validateObjectIdMIddleware } from "@shared/infra/http/middlewares/ValidateDeleteCar";
import { UpdateUserSchema } from "../../schemas/UpdateUserSchema";

const usersRouter = Router();
const usersController = container.resolve(UsersController);

/**
 * @openapi
 * /api/v1/user:
 *   post:
 *     tags:
 *       - Users
 *     summary: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUser'
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateUserResponse'
 *       400:
 *         description: Bad request/User does not have at least 18 years
 *       409:
 *         description: CPF/Email already exists
 */

usersRouter.post("/", CreateUserSchema, CPFValidator, usersController.create);

/**
 * @openapi
 * /api/v1/user:
 *   get:
 *     tags:
 *       - Users
 *     summary: List all users
 *     description: List all users
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateUserResponse'
 */
usersRouter.get("/", usersController.index);

/**
 * @openapi
 * '/api/v1/user/{userId}':
 *   delete:
 *     tags:
 *       - Users
 *     summary: Delete a user by id
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       204:
 *         description: Sucess No content
 *       404:
 *         description: Not found
 */
usersRouter.delete("/:id", validateObjectIdMIddleware, usersController.delete);

/**
 * @openapi
 * '/api/v1/user/{userId}':
 *   get:
 *     tags:
 *       - Users
 *     summary: List a user by id
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateUserResponse'
 *       404:
 *         description: User Not found
 */
usersRouter.get("/:id", validateObjectIdMIddleware, usersController.show);

/**
 * @openapi
 * '/api/v1/user/{userId}':
 *   put:
 *     tags:
 *       - Users
 *     summary: Update a user by id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateUser'
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UpdateUserResponse'
 *       400:
 *         description: Bad request/User does not have at least 18 years
 *       404:
 *         description: Not found
 */
usersRouter.put(
  "/:id",
  UpdateUserSchema,
  validateObjectIdMIddleware,
  CPFValidator,
  usersController.update,
);

export default usersRouter;
