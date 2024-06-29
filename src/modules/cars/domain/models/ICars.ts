import { Accessory } from "@modules/cars/infra/typeorm/entities/dtos/Acessory";
import { ObjectId } from "mongodb";

export interface ICars {
  _id: ObjectId;
  model: string;
  color: string;
  year: string;
  value_per_day: number;
  accessories: Accessory[];
  number_of_passengers: number;
}
