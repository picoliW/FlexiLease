import { ICarRepository } from "@modules/cars/domain/repositories/ICarRepository";
import { dataSource } from "@shared/infra/typeorm";
import { Repository } from "typeorm";
import Car from "../entities/Cars";
import { ICreateCar } from "@modules/cars/domain/models/ICreateCar";
import { ObjectId } from "mongodb";
import { ICars } from "@modules/cars/domain/models/ICars";

class CarRepository implements ICarRepository {
  private ormRepository: Repository<Car>;

  constructor() {
    this.ormRepository = dataSource.getRepository(Car);
  }

  public async create({
    model,
    color,
    year,
    value_per_day,
    accessories,
    number_of_passengers,
  }: ICreateCar): Promise<Car> {
    const car = this.ormRepository.create({
      model,
      color,
      year,
      value_per_day,
      accessories,
      number_of_passengers,
    });
    await this.ormRepository.save(car);
    return car as ICars;
  }
  public async findById(id: ObjectId): Promise<Car | null> {
    const car = await this.ormRepository.findOne({
      where: { _id: id },
    });
    return car;
  }

  public async save(car: Car): Promise<Car> {
    await this.ormRepository.save(car);

    return car;
  }

  public async find(): Promise<Car[]> {
    const cars = await this.ormRepository.find();
    return cars;
  }

  public async remove(car: Car): Promise<void> {
    await this.ormRepository.remove(car);
  }
}

export default CarRepository;
