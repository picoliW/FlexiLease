import request from "supertest";
import { app } from "@shared/infra/http/app";
import { dataSource } from "@shared/infra/typeorm";
import { ObjectId } from "mongodb";

const MAIN_ROUTE = "/api/v1/car";
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvYW8yQGpvYW8uY29tIiwicGFzc3dvcmQiOiIxMjM0NTYifQ.9qMVdLLLLruQ7VjQdp1S60sCXdHJ4qxiBJlPK0-EjPM";
let carId: ObjectId;
let accessoryId: ObjectId;

beforeAll(async () => {
  await dataSource.initialize();
});

beforeEach(async () => {
  await dataSource.dropDatabase();

  const response = await request(app)
    .post(MAIN_ROUTE)
    .send({
      model: "Uno",
      color: "Black",
      year: "2022",
      value_per_day: 100,
      accessories: [
        { description: "Cool car" },
        { description: "Bullet proof" },
      ],
      number_of_passengers: 5,
    })
    .set("Authorization", `Bearer ${TOKEN}`);

  carId = response.body._id;
  accessoryId = response.body.accessories[0].id;
});

afterAll(async () => {
  await dataSource.dropDatabase();
  await dataSource.destroy();
});

describe("Car Routes", () => {
  describe("Create Car", () => {
    test("Should create a car", async () => {
      const response = await request(app)
        .post(MAIN_ROUTE)
        .send({
          model: "Uno",
          color: "Black",
          year: "2022",
          value_per_day: 100,
          accessories: [
            { description: "Good engine" },
            { description: "Nice car" },
          ],
          number_of_passengers: 5,
        })
        .set("Authorization", `Bearer ${TOKEN}`);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("_id");
      expect(response.body.model).toBe("Uno");
    });
  });

  describe("Retrieve Cars", () => {
    test("Should list all cars", async () => {
      const response = await request(app)
        .get(MAIN_ROUTE)
        .set("Authorization", `Bearer ${TOKEN}`);

      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Object);
    });

    test("Should list a car by id", async () => {
      const response = await request(app)
        .get(`${MAIN_ROUTE}/${carId}`)
        .set("Authorization", `Bearer ${TOKEN}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("_id");
      expect(response.body.model).toBe("Uno");
    });
  });

  describe("Update Car", () => {
    test("Should update a car", async () => {
      const response = await request(app)
        .put(`${MAIN_ROUTE}/${carId}`)
        .send({
          model: "BMW",
          color: "White",
          year: "2021",
          value_per_day: 50,
          number_of_passengers: 5,
        })
        .set("Authorization", `Bearer ${TOKEN}`);

      expect(response.status).toBe(201);
      expect(response.body.model).toBe("BMW");
    });

    test("Should not update a car with invalid id", async () => {
      const response = await request(app)
        .put(`${MAIN_ROUTE}/668580691d20628921c4b88d`)
        .send({
          model: "BMW",
        })
        .set("Authorization", `Bearer ${TOKEN}`);

      expect(response.status).toBe(404);
      expect(response.body.message).toBe("Car not found");
    });

    test("Should update a car accessory", async () => {
      const response = await request(app)
        .patch(`${MAIN_ROUTE}/${carId}/accessories/${accessoryId}`)
        .send({
          description: "Updated accessory",
        })
        .set("Authorization", `Bearer ${TOKEN}`);

      expect(response.status).toBe(200);
      expect(response.body.accessories[0].description).toBe(
        "Updated accessory",
      );
    });

    test("Should not update a car accessory with invalid id", async () => {
      const response = await request(app)
        .patch(`${MAIN_ROUTE}/${carId}/accessories/668580691d20628921c4b88d`)
        .send({
          description: "Updated accessory",
        })
        .set("Authorization", `Bearer ${TOKEN}`);

      expect(response.status).toBe(404);
      expect(response.body.message).toBe("Accessory not found");
    });

    test("Should delete a car accessory", async () => {
      const response = await request(app)
        .patch(`${MAIN_ROUTE}/${carId}/accessories/${accessoryId}`)
        .send({ description: "Updated accessory" })
        .set("Authorization", `Bearer ${TOKEN}`);

      expect(response.status).toBe(200);
    });

    test("Should not delete a car accessory with invalid car id", async () => {
      const response = await request(app)
        .patch(
          `${MAIN_ROUTE}/668580691d20628921c4b88d/accessories/${accessoryId}`,
        )
        .send({ description: "Updated accessory" })
        .set("Authorization", `Bearer ${TOKEN}`);

      expect(response.status).toBe(404);
      expect(response.body.message).toBe("Car not found");
    });
  });

  describe("Delete Car", () => {
    test("Should delete a car", async () => {
      const response = await request(app)
        .delete(`${MAIN_ROUTE}/${carId}`)
        .set("Authorization", `Bearer ${TOKEN}`);

      expect(response.status).toBe(204);
    });

    test("Should not delete a car with invalid id", async () => {
      const response = await request(app)
        .delete(`${MAIN_ROUTE}/668580691d20628921c4b88d`)
        .set("Authorization", `Bearer ${TOKEN}`);

      expect(response.status).toBe(404);
      expect(response.body.message).toBe("Car not found");
    });
  });
});
