import "reflect-metadata";
import "dotenv/config";
import { app } from "./app";
import { dataSource } from "../typeorm";
import swaggerDocs from "@shared/utils/swagger";

dataSource
  .initialize()
  .then(() => {
    console.log("Database connection established successfully! 🚀");
    const server = app.listen(process.env.PORT || 3001, () => {
      console.log(`Server is running on port ${process.env.PORT || 3001}! 🏆`);
      console.log(`Swagger docs available at http://localhost:3000/docs`);
    });
  })
  .catch(error => {
    console.error("Error during Data Source initialization:", error);
  });
