import CreateCarService from "@modules/cars/services/CreateCarService";
import DeleteCarService from "@modules/cars/services/DeleteCarService";
import ListCarService from "@modules/cars/services/ListCarService";
import ShowOneCarService from "@modules/cars/services/ShowOneCarService";
import UpdateAccessoryService from "@modules/cars/services/UpdateAccessoryService";
import UpdateCarService from "@modules/cars/services/UpdateCarService";
import { NotFoundError } from "@shared/errors/NotFoundError";
import { instanceToInstance } from "class-transformer";
import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { container } from "tsyringe";

export class CarController {
  public async index(req: Request, res: Response): Promise<Response> {
    let { page = 1, limit = 100 } = req.query;
    page = Number(page);
    limit = Number(limit);

    const offset = (page - 1) * limit;

    const listCar = container.resolve(ListCarService);
    const { cars, total } = await listCar.execute({ limit, offset });

    const totalPages = Math.ceil(total / limit);

    return res.json({
      cars: cars.map(car => instanceToInstance(car)),
      total,
      limit,
      offset: page,
      offsets: totalPages,
    });
  }

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

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const deleteCar = container.resolve(DeleteCarService);

    try {
      const objectId = new ObjectId(id);
      await deleteCar.execute({ _id: objectId });
      return res.status(204).json();
    } catch (error) {
      return res.status(404).json({ message: "Car not found" });
    }
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const {
      model,
      color,
      year,
      value_per_day,
      accessories,
      number_of_passengers,
    } = req.body;
    const updateCar = container.resolve(UpdateCarService);
    const objectId = new ObjectId(id);

    try {
      const car = await updateCar.execute({
        _id: objectId,
        model,
        color,
        year,
        value_per_day,
        accessories,
        number_of_passengers,
      });

      return res.status(201).json(instanceToInstance(car));
    } catch (error) {
      if (error instanceof NotFoundError) {
        return res.status(404).json({ message: error.message });
      }
      throw error;
    }
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const showCar = container.resolve(ShowOneCarService);
    const objectId = new ObjectId(id);
    const car = await showCar.execute(objectId);

    if (!car) {
      return res.status(404).json({ error: "Car not found" });
    }

    return res.json(instanceToInstance(car));
  }

  public async updateAccessory(req: Request, res: Response): Promise<Response> {
    const { id: carId, accessoryId } = req.params;
    const { description } = req.body;
    const updateAccessory = container.resolve(UpdateAccessoryService);

    try {
      const objectIdCarId = new ObjectId(carId);
      const objectIdAccessoryId = new ObjectId(accessoryId);

      const updatedCar = await updateAccessory.execute(
        objectIdCarId,
        objectIdAccessoryId,
        description,
      );

      return res.json(updatedCar);
    } catch (error) {
      if (error instanceof NotFoundError) {
        return res.status(404).json({ message: error.message });
      }
      throw error;
    }
  }
}
