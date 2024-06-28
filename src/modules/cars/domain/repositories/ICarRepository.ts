import { ICreateCar } from "../models/ICreateCar";
import { ICars } from "../models/ICars";
import Car from "@modules/cars/infra/typeorm/entities/Cars";

export interface ICarRepository {
  create(data: ICreateCar): Promise<ICars>;
  findById(id: string): Promise<Car | null>;
  save(car: Car): Promise<Car>;
}
