import { Router } from "express";
import AuthController from "../controller/AuthController";

const authRouter = Router();
const authController = new AuthController();

/**
 * @openapi
 * /api/v1/authenticate:
 *   post:
 *     tags:
 *       - Authenticate
 *     summary: Authenticate a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginUser'
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginUserResponse'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Invalid email or password
 */
authRouter.post("/", authController.login);

export default authRouter;
