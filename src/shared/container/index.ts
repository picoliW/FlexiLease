import { ICarRepository } from "@modules/cars/domain/repositories/ICarRepository";
import CarRepository from "@modules/cars/infra/typeorm/repositories/CarRepository";
import { container } from "tsyringe";

container.registerSingleton<ICarRepository>("CarRepository", CarRepository);
