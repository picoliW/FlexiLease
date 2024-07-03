import request from "supertest";
import { app } from "@shared/infra/http/app";

test("Deve responder na raiz", () => {
  return request(app).get("/api/v1").expect(200);
});
