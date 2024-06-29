import { DataSource } from "typeorm";
import Car from "@modules/cars/infra/typeorm/entities/Cars";
import User from "@modules/users/infra/typeorm/entities/User";

require("dotenv").config();

export const dataSource = new DataSource({
  type: "mongodb",
  database: process.env.DB_NAME,
  synchronize: true,
  logging: ["query", "error"],
  entities: [Car, User],
  migrations: [],
  subscribers: [],
});
