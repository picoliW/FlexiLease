import { Accessory } from "@modules/cars/infra/typeorm/entities/dtos/Acessory";

export interface ICars {
  id: string;
  model: string;
  color: string;
  year: string;
  value_per_day: number;
  accessories: Accessory[];
  number_of_passengers: number;
}
