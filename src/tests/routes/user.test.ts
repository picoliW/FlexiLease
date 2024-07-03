import request from "supertest";
import { app } from "@shared/infra/http/app";
import { dataSource } from "@shared/infra/typeorm";
import { ObjectId } from "mongodb";
import { NotFoundError } from "@shared/errors/NotFoundError";

const MAIN_ROUTE = "/api/v1/user";
let userId: ObjectId;

beforeAll(async () => {
  await dataSource.initialize();
  await dataSource.runMigrations();
});

afterAll(async () => {
  await dataSource.dropDatabase();
  await dataSource.destroy();
});

describe("User Routes", () => {
  describe("Create User", () => {
    test("Should create an user", async () => {
      const response = await request(app).post(MAIN_ROUTE).send({
        name: "Luiz Test",
        cpf: "760.929.990-13",
        birth: "30/11/2004",
        email: "luiz@gmail.com",
        password: "123456",
        cep: "97707598",
        qualified: "sim",
      });

      expect(response.body).toHaveProperty("_id");
      expect(response.body.name).toBe("Luiz Test");
      expect(response.body.birth).toBe("30/11/2004");
      expect(response.body.email).toBe("luiz@gmail.com");
      expect(response.status).toBe(201);

      const userRepository = dataSource.getRepository("User");
      const user = await userRepository.findOne({
        where: { email: "luiz@gmail.com" },
      });
      userId = user?._id;
    });

    test("Should not create an user with existing CPF", async () => {
      const response = await request(app).post(MAIN_ROUTE).send({
        name: "Luiz Test",
        cpf: "760.929.990-13",
        birth: "30/11/2004",
        email: "test@test.com",
        password: "123456",
        cep: "97707598",
        qualified: "sim",
      });
      expect(response.status).toBe(409);
      expect(response.body.message).toBe("CPF already exists");
    });

    test("Should not create an user with existing Email", async () => {
      const response = await request(app).post(MAIN_ROUTE).send({
        name: "Luiz Test",
        cpf: "090.192.890-98",
        birth: "30/11/2004",
        email: "luiz@gmail.com",
        password: "123456",
        cep: "97707598",
        qualified: "sim",
      });
      expect(response.status).toBe(409);
      expect(response.body.message).toBe("Email already exists");
    });

    test("Should not create an user with less than 18 years old", async () => {
      const response = await request(app).post(MAIN_ROUTE).send({
        name: "Luiz Test",
        cpf: "090.192.890-98",
        birth: "01/01/2020",
        email: "test3@test.com",
        password: "123456",
        cep: "97707598",
        qualified: "sim",
      });
      expect(response.status).toBe(400);
      expect(response.body.message).toBe("User must be at least 18 years old");
    });
  });

  describe("Retrieve Users", () => {
    test("Should list all users", async () => {
      const response = await request(app).get(MAIN_ROUTE);

      expect(response.status).toBe(200);
      expect(response.body.length).toBeGreaterThan(0);
    });

    test("Should show one user", async () => {
      const response = await request(app).get(`${MAIN_ROUTE}/${userId}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("cpf");
    });
  });

  describe("Update User", () => {
    beforeEach(async () => {
      const res = await request(app).post(MAIN_ROUTE).send({
        name: "Luiz Test",
        cpf: "938.694.100-78",
        birth: "30/11/2004",
        email: "luiz2@gmail.com",
        password: "123456",
        cep: "97707598",
        qualified: "sim",
      });
    });

    test("Should update an user", async () => {
      const response = await request(app).put(`${MAIN_ROUTE}/${userId}`).send({
        name: "Luiz Test Update",
      });

      expect(response.status).toBe(200);
      expect(response.body.name).toBe("Luiz Test Update");
    });

    test("Should not update an user that does not exist", async () => {
      const response = await request(app).put(
        `${MAIN_ROUTE}/668580691d20628921c4b88d`,
      );

      expect(response.body.message).toBe("User not found");
      expect(response.status).toBe(404);
    });

    test("Should not update an user with existing CPF", async () => {
      const response = await request(app).put(`${MAIN_ROUTE}/${userId}`).send({
        cpf: "938.694.100-78",
      });

      expect(response.status).toBe(409);
      expect(response.body.message).toBe("CPF already exists");
    });

    test("Should not update an user with existing Email", async () => {
      const response = await request(app).put(`${MAIN_ROUTE}/${userId}`).send({
        email: "luiz2@gmail.com",
      });

      expect(response.status).toBe(409);
      expect(response.body.message).toBe("Email already exists");
    });
  });

  describe("User authentication", () => {
    test("Should log-in an user", async () => {
      const response = await request(app).post("/api/v1/authenticate").send({
        email: "luiz@gmail.com",
        password: "123456",
      });
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("token");
    });

    test("Should not log-in an user with nonexistent email", async () => {
      const response = await request(app).post("/api/v1/authenticate").send({
        email: "luizerrado@gmail.com",
        password: "123456",
      });
      expect(response.status).toBe(401);
      expect(response.body.message).toBe("User not found");
    });

    test("Should not log-in an user with invalid password", async () => {
      const response = await request(app).post("/api/v1/authenticate").send({
        email: "luiz@gmail.com",
        password: "1234567",
      });
      expect(response.status).toBe(401);
      expect(response.body.message).toBe(
        "Incorrect email/password combination",
      );
    });
  });

  describe("Delete User", () => {
    test("Should not delete an user that does not exist", async () => {
      const response = await request(app).delete(
        `${MAIN_ROUTE}/668580691d20628921c4b88d`,
      );

      expect(response.body.message).toBe("User not found");
      expect(response.status).toBe(404);
    });

    test("Should delete an user", async () => {
      const response = await request(app).delete(`${MAIN_ROUTE}/${userId}`);

      expect(response.status).toBe(204);
    });
  });
});
