import CreateCarService from "@modules/cars/services/CreateCarService";
import DeleteCarService from "@modules/cars/services/DeleteCarService";
import ListCarService from "@modules/cars/services/ListCarService";
import ShowOneCarService from "@modules/cars/services/ShowOneCarService";
import UpdateAccessoryService from "@modules/cars/services/UpdateAccessoryService";
import UpdateCarService from "@modules/cars/services/UpdateCarService";
import { instanceToInstance } from "class-transformer";
import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { container } from "tsyringe";

export class CarController {
  public async index(req: Request, res: Response): Promise<Response> {
    const listCar = container.resolve(ListCarService);

    const cars = await listCar.execute();

    return res.json(instanceToInstance(cars));
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
      return res.status(404).json({ message: "Car or Accessory not found" });
    }
  }
}
