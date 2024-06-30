import { Request, Response } from "express";
import { instanceToInstance } from "class-transformer";
import { container } from "tsyringe";
import CreateReserveService from "@modules/reserve/services/CreateReserveService";

export default class ReserveController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { id_user, start_date, end_date, id_car } = request.body;

    const createReserve = container.resolve(CreateReserveService);

    const reserve = await createReserve.execute({
      id_user,
      start_date,
      end_date,
      id_car,
    });

    return response.json(instanceToInstance(reserve));
  }
}
