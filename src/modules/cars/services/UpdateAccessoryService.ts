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

    const accessory = car.accessories.find(acc => acc.id.equals(accessoryId));

    if (!accessory) {
      throw new NotFoundError("Accessory not found");
    }

    const existingAccessory = car.accessories.find(
      acc => acc.description === newDescription,
    );

    if (existingAccessory) {
      accessory.description = "";
    } else {
      accessory.description = newDescription;
    }

    await this.carRepository.save(car);

    return car;
  }
}

export default UpdateAccessoryService;
