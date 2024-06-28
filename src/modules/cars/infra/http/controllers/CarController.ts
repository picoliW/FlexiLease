import CreateCarService from "@modules/cars/services/CreateCarService";
import { instanceToInstance } from "class-transformer";
import { Request, Response } from "express";
import { container } from "tsyringe";

export class CarController {
  public async create(req: Request, res: Response): Promise<Response> {
    const {
      model,
      color,
      year,
      value_per_day,
      accessories,
      number_of_passengers,
    } = req.body;
    const createCar = container.resolve(CreateCarService);
    const car = await createCar.execute({
      model,
      color,
      year,
      value_per_day,
      accessories,
      number_of_passengers,
    });

    return res.status(201).json(instanceToInstance(car));
  }
}
