import { inject, injectable } from "tsyringe";
import { ICarRepository } from "../domain/repositories/ICarRepository";
import { NotFoundError } from "@shared/errors/NotFoundError";
import { IDeleteCar } from "../domain/models/IDeleteCar";
import { ObjectId } from "mongodb";

@injectable()
class DeleteCarService {
  constructor(
    @inject("CarRepository")
    private carsRepository: ICarRepository,
  ) {}

  public async execute({ _id }: IDeleteCar): Promise<void> {
    try {
      const car = await this.carsRepository.findById(new ObjectId(_id));

      if (!car) {
        throw new NotFoundError("Car not found");
      }

      await this.carsRepository.remove(car);
    } catch (error) {
      throw error;
    }
  }
}

export default DeleteCarService;
