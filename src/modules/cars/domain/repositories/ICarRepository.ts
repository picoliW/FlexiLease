import { ICreateCar } from "../models/ICreateCar";
import { ICars } from "../models/ICars";
import Car from "@modules/cars/infra/typeorm/entities/Cars";
import { ObjectId } from "mongodb";

export interface ICarRepository {
  create(data: ICreateCar): Promise<ICars>;
  findById(id: ObjectId): Promise<Car | null>;
  save(car: Car): Promise<Car>;
  find(): Promise<Car[]>;
  remove(car: Car): Promise<void>;
  update(car: Car): Promise<Car>;
}
