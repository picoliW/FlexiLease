import { DataSource } from "typeorm";
import Car from "@modules/cars/infra/typeorm/entities/Cars";

require("dotenv").config();

export const dataSource = new DataSource({
  type: "mongodb",
  database: process.env.DB_NAME,
  synchronize: true,
  logging: ["query", "error"],
  entities: [Car],
  migrations: [],
  subscribers: [],
});
