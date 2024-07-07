import { DataSource } from "typeorm";
import Car from "@modules/cars/infra/typeorm/entities/Cars";
import User from "@modules/users/infra/typeorm/entities/User";
import Reserve from "@modules/reserve/infra/typeorm/entities/Reserve";

require("dotenv").config();

export const dataSource = new DataSource({
  type: "mongodb",
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  synchronize: true,
  logging: ["query", "error"],
  entities: [Car, User, Reserve],
  migrations: [],
  subscribers: [],
});
