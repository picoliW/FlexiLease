import { injectable, inject } from "tsyringe";
import { ICarRepository } from "../domain/repositories/ICarRepository";
import { ObjectId } from "mongodb";
import { NotFoundError } from "@shared/errors/NotFoundError";

@injectable()
class UpdateAccessoryService {
  constructor(
    @inject("CarRepository")
    private carRepository: ICarRepository,
  ) {}

  public async execute(
    carId: ObjectId,
    accessoryId: ObjectId,
    newDescription: string,
  ) {
    const car = await this.carRepository.findById(carId);

    if (!car) {
      throw new NotFoundError("Car not found");
    }

    const accessoryIndex = car.accessories.findIndex(acc =>
      acc.id.equals(accessoryId),
    );

    if (accessoryIndex === -1) {
      throw new NotFoundError("Accessory not found");
    }

    const existingAccessoryIndex = car.accessories.findIndex(
      acc => acc.description === newDescription,
    );

    if (existingAccessoryIndex !== -1) {
      car.accessories.splice(existingAccessoryIndex, 1);
    } else {
      car.accessories[accessoryIndex].description = newDescription;
    }

    await this.carRepository.save(car);

    return car;
  }
}

export default UpdateAccessoryService;
