import { ICarRepository } from "@modules/cars/domain/repositories/ICarRepository";
import CarRepository from "@modules/cars/infra/typeorm/repositories/CarRepository";
import { IUsersRepository } from "@modules/users/domain/repositories/IUsersRepository";
import UsersRepository from "@modules/users/infra/typeorm/repositories/UserRepository";
import { container } from "tsyringe";

container.registerSingleton<ICarRepository>("CarRepository", CarRepository);

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository,
);
