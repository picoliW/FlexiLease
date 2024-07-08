import { Router } from "express";
import { container } from "tsyringe";
import ReserveController from "../controller/ReserveController";
import { validateCreateReserve } from "../../schemas/CreateReserveValidation";
import { validateObjectIdMIddleware } from "@shared/infra/http/middlewares/ValidateDeleteCar";
import { validateUpdateReserve } from "../../schemas/UpdateReserveValidation";

const reserveRouter = Router();
const reserveController = container.resolve(ReserveController);

/**
 * @openapi
 * /api/v1/reserve:
 *   post:
 *     tags:
 *       - Reserves
 *     summary: Create a new reserve
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateReserve'
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateReserveResponse'
 *       400:
 *         description: Bad request/User does not have a valid drivers license
 *       404:
 *         description: id_user or id_car Not found
 *       409:
 *         description: Car already reserved/ User already has a reservation
 */
reserveRouter.post("/", validateCreateReserve, reserveController.create);

/**
 * @openapi
 * /api/v1/reserve:
 *   get:
 *     tags:
 *       - Reserves
 *     summary: List all reserves
 *     description: List all reserves
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateReserveResponse'
 */
reserveRouter.get("/", reserveController.index);

/**
 * @openapi
 * '/api/v1/reserve/{reserveId}':
 *   get:
 *     tags:
 *       - Reserves
 *     summary: Show a reserve
 *     description: Show a reserve
 *     parameters:
 *       - in: path
 *         name: reserveId
 *         required: true
 *         description: Reserve ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateReserveResponse'
 *       404:
 *         description: Reserve not found
 */
reserveRouter.get("/:id", validateObjectIdMIddleware, reserveController.show);

/**
 * @openapi
 * '/api/v1/reserve/{reserveId}':
 *   put:
 *     tags:
 *       - Reserves
 *     summary: Update a reserve
 *     description: Update a reserve
 *     parameters:
 *       - in: path
 *         name: reserveId
 *         required: true
 *         description: Reserve ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateReserve'
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateReserveResponse'
 *       400:
 *         description: Bad request/User does not have a valid drivers license
 *       404:
 *         description: id_user or id_car Not found
 */
reserveRouter.put(
  "/:id",
  validateUpdateReserve,
  validateObjectIdMIddleware,
  reserveController.update,
);

/**
 * @openapi
 * '/api/v1/reserve/{reserveId}':
 *   delete:
 *     tags:
 *       - Reserves
 *     summary: Delete a reserve
 *     description: Delete a reserve
 *     parameters:
 *       - in: path
 *         name: reserveId
 *         required: true
 *         description: Reserve ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Reserve not found
 */
reserveRouter.delete(
  "/:id",
  validateObjectIdMIddleware,
  reserveController.delete,
);

export default reserveRouter;
