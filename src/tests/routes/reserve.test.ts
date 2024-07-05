import request from "supertest";
import { app } from "@shared/infra/http/app";
import { dataSource } from "@shared/infra/typeorm";
import { ObjectId } from "mongodb";
import { object } from "joi";

const CAR_ROUTE = "/api/v1/car";
const USER_ROUTE = "/api/v1/user";
const MAIN_ROUTE = "/api/v1/reserve";
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvYW8yQGpvYW8uY29tIiwicGFzc3dvcmQiOiIxMjM0NTYifQ.9qMVdLLLLruQ7VjQdp1S60sCXdHJ4qxiBJlPK0-EjPM";
let carId: ObjectId;
let userId: ObjectId;
let reserveId: ObjectId;

beforeAll(async () => {
  await dataSource.initialize();

  const userResponse = await request(app)
    .post(USER_ROUTE)
    .send({
      name: "Luiz Test",
      cpf: "760.929.990-13",
      birth: "30/11/2004",
      email: "luiz@gmail.com",
      password: "123456",
      cep: "97707598",
      qualified: "sim",
    })
    .set("Authorization", `Bearer ${TOKEN}`);

  userId = userResponse.body._id;

  const carResponse = await request(app)
    .post(CAR_ROUTE)
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

  carId = carResponse.body._id;
});

afterAll(async () => {
  await dataSource.dropDatabase();
  await dataSource.destroy();
});

describe("Reserve Routes", () => {
  describe("Create Reserve", () => {
    test("Should create a reserve", async () => {
      const response = await request(app)
        .post(MAIN_ROUTE)
        .send({
          id_user: userId,
          id_car: carId,
          start_date: "01/01/2024",
          end_date: "05/01/2024",
        })
        .set("Authorization", `Bearer ${TOKEN}`);

      reserveId = response.body._id;
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("_id");
      expect(response.body).toHaveProperty("final_value");
      expect(response.body.final_value).toBe("400.00");
    });

    test("Should not create a reserve with invalid car", async () => {
      const response = await request(app)
        .post(MAIN_ROUTE)
        .send({
          id_user: userId,
          id_car: "668580691d20628921c4b88d",
          start_date: "01/01/2024",
          end_date: "05/01/2024",
        })
        .set("Authorization", `Bearer ${TOKEN}`);

      expect(response.status).toBe(404);
      expect(response.body.message).toBe("Car not found");
    });

    test("Should not create a reserve with invalid user", async () => {
      const response = await request(app)
        .post(MAIN_ROUTE)
        .send({
          id_user: "668580691d20628921c4b88d",
          id_car: carId,
          start_date: "01/01/2024",
          end_date: "05/01/2024",
        })
        .set("Authorization", `Bearer ${TOKEN}`);

      expect(response.status).toBe(404);
      expect(response.body.message).toBe("User not found");
    });

    test("Should not create a resereve if user is not qualified", async () => {
      const userResponse = await request(app)
        .post(USER_ROUTE)
        .send({
          name: "Luiz Test",
          cpf: "281.269.980-91",
          birth: "30/11/2004",
          email: "luiz2@gmail.com",
          password: "123456",
          cep: "97707598",
          qualified: "não",
        })
        .set("Authorization", `Bearer ${TOKEN}`);

      const response = await request(app)
        .post(MAIN_ROUTE)
        .send({
          id_user: userResponse.body._id,
          id_car: carId,
          start_date: "01/01/2024",
          end_date: "05/01/2024",
        })
        .set("Authorization", `Bearer ${TOKEN}`);

      expect(response.status).toBe(400);
      expect(response.body.message).toBe(
        "User does not have a valid drivers license",
      );
    });

    test("Should not reserveate a car that is already reserved", async () => {
      const response = await request(app)
        .post(MAIN_ROUTE)
        .send({
          id_user: userId,
          id_car: carId,
          start_date: "01/01/2024",
          end_date: "05/01/2024",
        })
        .set("Authorization", `Bearer ${TOKEN}`);

      expect(response.status).toBe(409);
      expect(response.body.message).toBe(
        "Car is already reserved for the selected dates",
      );
    });

    test("Should not reserve a car if user has another reservation", async () => {
      const carResponse = await request(app)
        .post(CAR_ROUTE)
        .send({
          model: "Fiat",
          color: "Red",
          year: "2023",
          value_per_day: 150,
          accessories: [
            { description: "Beautifull" },
            { description: "Good wheels" },
          ],
          number_of_passengers: 5,
        })
        .set("Authorization", `Bearer ${TOKEN}`);

      const anotherCarId = carResponse.body._id;

      await request(app)
        .post(MAIN_ROUTE)
        .send({
          id_user: userId,
          id_car: anotherCarId,
          start_date: "06/01/2024",
          end_date: "10/01/2024",
        })
        .set("Authorization", `Bearer ${TOKEN}`);

      const response = await request(app)
        .post(MAIN_ROUTE)
        .send({
          id_user: userId,
          id_car: carId,
          start_date: "06/01/2024",
          end_date: "10/01/2024",
        })
        .set("Authorization", `Bearer ${TOKEN}`);

      expect(response.status).toBe(409);
      expect(response.body.message).toBe(
        "User already has a reservation for the selected dates",
      );
    });
  });

  describe("Retrieve Reserve", () => {
    test("Should list all reserves", async () => {
      const response = await request(app)
        .get(MAIN_ROUTE)
        .set("Authorization", `Bearer ${TOKEN}`);

      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Object);
    });

    test("Should list a reserve by id", async () => {
      const response = await request(app)
        .get(`${MAIN_ROUTE}/${reserveId}`)
        .set("Authorization", `Bearer ${TOKEN}`);

      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Object);
    });

    test("Should not list a reserve with invalid id", async () => {
      const response = await request(app)
        .get(`${MAIN_ROUTE}/668580691d20628921c4b88d`)
        .set("Authorization", `Bearer ${TOKEN}`);

      expect(response.status).toBe(404);
      expect(response.body.message).toBe("Reserve not found");
    });
  });

  describe("Update Reserve", () => {
    test("Should update a reserve", async () => {
      const response = await request(app)
        .put(`${MAIN_ROUTE}/${reserveId}`)
        .send({
          id_user: userId,
          start_date: "02/01/2024",
          end_date: "06/01/2024",
          id_car: carId,
        })
        .set("Authorization", `Bearer ${TOKEN}`);

      expect(response.status).toBe(201);
      expect(response.body.start_date).toBe("02/01/2024");
    });

    test("Should not update a reserve with invalid id", async () => {
      const response = await request(app)
        .put(`${MAIN_ROUTE}/668580691d20628921c4b88d`)
        .send({
          start_date: "02/01/2024",
        })
        .set("Authorization", `Bearer ${TOKEN}`);

      expect(response.status).toBe(404);
      expect(response.body.message).toBe("Reserve not found");
    });

    test("Should not update a reserve with invalid car", async () => {
      const response = await request(app)
        .put(`${MAIN_ROUTE}/${reserveId}`)
        .send({
          id_car: "668580691d20628921c4b88d",
        })
        .set("Authorization", `Bearer ${TOKEN}`);

      expect(response.status).toBe(404);
      expect(response.body.message).toBe("Car not found");
    });
  });

  describe("Delete Reserve", () => {
    test("Should delete a reserve", async () => {
      const response = await request(app)
        .delete(`${MAIN_ROUTE}/${reserveId}`)
        .set("Authorization", `Bearer ${TOKEN}`);

      expect(response.status).toBe(204);
    });

    test("Should not delete a reserve with invalid id", async () => {
      const response = await request(app)
        .delete(`${MAIN_ROUTE}/668580691d20628921c4b88d`)
        .set("Authorization", `Bearer ${TOKEN}`);

      expect(response.status).toBe(404);
      expect(response.body.message).toBe("Reserve not found");
    });
  });
});
