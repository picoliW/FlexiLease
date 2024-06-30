import { Request, Response } from "express";
import { instanceToInstance } from "class-transformer";
import { container } from "tsyringe";
import CreateReserveService from "@modules/reserve/services/CreateReserveService";
import { ConflictError } from "@shared/errors/ConflictError";
import { NotFoundError } from "@shared/errors/NotFoundError";
import { BadRequestError } from "@shared/errors/BadRequestError";

export default class ReserveController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { id_user, start_date, end_date, id_car } = request.body;

      const createReserve = container.resolve(CreateReserveService);

      const reserve = await createReserve.execute({
        id_user,
        start_date,
        end_date,
        id_car,
      });

      return response.json(instanceToInstance(reserve));
    } catch (error) {
      if (error instanceof ConflictError) {
        return response.status(409).json({ message: error.message });
      } else if (error instanceof BadRequestError) {
        return response.status(400).json({ message: error.message });
      } else if (error instanceof NotFoundError) {
        return response.status(400).json({ message: error.message });
      }
      throw error;
    }
  }
}
