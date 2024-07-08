import "reflect-metadata";
import { inject, injectable } from "tsyringe";
import { ICarRepository } from "../domain/repositories/ICarRepository";
import { IUpdateCar } from "../domain/models/IUpdateCar";
import Car from "../infra/typeorm/entities/Cars";
import { NotFoundError } from "@shared/errors/NotFoundError";
import { ObjectId } from "mongodb";

@injectable()
class UpdateCarService {
  constructor(
    @inject("CarRepository")
    private carRepository: ICarRepository,
  ) {}

  public async execute({
    _id,
    model,
    color,
    year,
    value_per_day,
    accessories,
    number_of_passengers,
  }: IUpdateCar): Promise<Car> {
    const car = await this.carRepository.findById(new ObjectId(_id));

    if (!car) {
      throw new NotFoundError("Car not found");
    }

    car.model = model;
    car.color = color;
    car.year = year;
    car.value_per_day = value_per_day;
    car.accessories = accessories;
    car.number_of_passengers = number_of_passengers;

    await this.carRepository.save(car);

    return car;
  }
}

export default UpdateCarService;
