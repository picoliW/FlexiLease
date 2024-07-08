import { container } from "tsyringe";
import { Router } from "express";
import { CarController } from "../controllers/CarController";
import { CreateCarSchema } from "../../schemas/CreateCarSchema";
import { UpdateCarSchema } from "../../schemas/UpdateCarSchema";
import { validateObjectIdMIddleware } from "@shared/infra/http/middlewares/ValidateDeleteCar";

const carsRouter = Router();
const carsController = container.resolve(CarController);

/**
 * @openapi
 * /api/v1/car:
 *   post:
 *     tags:
 *       - Cars
 *     summary: Create a new car
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateCar'
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/CreateCarResponse'
 *       400:
 *         description: Bad request
 */
carsRouter.post("/", CreateCarSchema, carsController.create);

/**
 * @openapi
 * /api/v1/car:
 *  get:
 *   tags:
 *   - Cars
 *   summary: List all cars
 *   description: List all cars
 *   responses:
 *     200:
 *       description: Success
 *       content:
 *         application/json:
 *           schema:
 *            $ref: '#/components/schemas/CreateCarResponse'
 */
carsRouter.get("/", carsController.index);

/**
 * @openapi
 * '/api/v1/car/{carId}':
 *   delete:
 *     tags:
 *       - Cars
 *     summary: Delete a car by id
 *     parameters:
 *       - name: carId
 *         in: path
 *         description: Car id
 *         required: true
 *     responses:
 *       204:
 *         description: Sucess No Content
 *       404:
 *         description: Car not found
 */
carsRouter.delete("/:id", validateObjectIdMIddleware, carsController.delete);

/**
 * @openapi
 * '/api/v1/car/{carId}':
 *   put:
 *     tags:
 *       - Cars
 *     summary: Update a car by id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateCar'
 *     parameters:
 *       - name: carId
 *         in: path
 *         description: Car id
 *         required: true
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UpdateCar'
 *       404:
 *         description: Car not found
 */
carsRouter.put(
  "/:id",
  UpdateCarSchema,
  validateObjectIdMIddleware,
  carsController.update,
);

/**
 * @openapi
 * '/api/v1/car/{carId}':
 *   get:
 *     tags:
 *       - Cars
 *     summary: List a car by id
 *     parameters:
 *       - name: carId
 *         in: path
 *         description: Car id
 *         required: true
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateCarResponse'
 *       404:
 *         description: Car not found
 */
carsRouter.get("/:id", validateObjectIdMIddleware, carsController.show);

/**
 * @openapi
 * '/api/v1/car/{carId}/accessories/{accessoryId}':
 *   patch:
 *     tags:
 *       - Cars
 *     summary: Update a car accessory by id
 *     parameters:
 *       - name: carId
 *         in: path
 *         description: Car id
 *         required: true
 *       - name: accessoryId
 *         in: path
 *         description: Accessory id
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateAccessories'
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Accessory not found
 */

carsRouter.patch(
  "/:id/accessories/:accessoryId",
  carsController.updateAccessory,
);

export default carsRouter;
