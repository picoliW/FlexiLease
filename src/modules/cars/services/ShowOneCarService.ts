import "reflect-metadata";
import { inject, injectable } from "tsyringe";
import { ICarRepository } from "../domain/repositories/ICarRepository";
import Car from "../infra/typeorm/entities/Cars";
import { ObjectId } from "mongodb";

@injectable()
class ShowOneCarService {
  constructor(
    @inject("CarRepository")
    private carsRepository: ICarRepository,
  ) {}

  public async execute(_id: ObjectId): Promise<Car | null> {
    const car = await this.carsRepository.findById(new ObjectId(_id));

    return car;
  }
}

export default ShowOneCarService;
