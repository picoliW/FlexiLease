import { Accessory } from "../../infra/typeorm/entities/dtos/Acessory";

export interface ICreateCar {
  model: string;
  color: string;
  year: string;
  value_per_day: number;
  accessories: Accessory[];
  number_of_passengers: number;
}
