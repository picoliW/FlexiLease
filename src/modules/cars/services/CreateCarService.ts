import "reflect-metadata";
import { inject, injectable } from "tsyringe";
import { ICarRepository } from "../domain/repositories/ICarRepository";
import { ICreateCar } from "../domain/models/ICreateCar";
import Car from "../infra/typeorm/entities/Cars";
import { ObjectId } from "mongodb";

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
    const car = new Car();
    car.model = model;
    car.color = color;
    car.year = year;
    car.value_per_day = value_per_day;
    car.number_of_passengers = number_of_passengers;

    // Gambiarra pra criar um id manualmente pro acessório, pq eu fiquei MUITO tempo tentando fzr isso
    car.accessories = accessories.map(accessory => {
      accessory.id = new ObjectId();
      return accessory;
    });

    await this.carRepository.save(car);

    return car;
  }
}

export default CreateCarService;
