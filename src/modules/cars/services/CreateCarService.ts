import "reflect-metadata";
import { inject, injectable } from "tsyringe";
import { ICarRepository } from "../domain/repositories/ICarRepository";
import { ICreateCar } from "../domain/models/ICreateCar";
import Car from "../infra/typeorm/entities/Cars";
import { BadRequestError } from "@shared/errors/BadRequestError";

@injectable()
class CreateCarService {
  constructor(
    @inject("CarRepository")
    private carRepository: ICarRepository,
  ) {}

  public async execute({
    model,
    color,
    year,
    value_per_day,
    accessories,
    number_of_passengers,
  }: ICreateCar): Promise<Car> {
    const car = await this.carRepository.create({
      model,
      color,
      year,
      value_per_day,
      accessories,
      number_of_passengers,
    });

    await this.carRepository.save(car);

    return car;
  }
}

export default CreateCarService;
