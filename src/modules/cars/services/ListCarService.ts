import { inject, injectable } from "tsyringe";
import { ICarRepository } from "../domain/repositories/ICarRepository";
import Car from "../infra/typeorm/entities/Cars";

@injectable()
class ListCarService {
  constructor(
    @inject("CarRepository")
    private carRepository: ICarRepository,
  ) {}
  public async execute(): Promise<Car[]> {
    const cars = this.carRepository.find();

    return cars;
  }
}

export default ListCarService;
