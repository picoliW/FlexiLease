import request from "supertest";
import { app } from "@shared/infra/http/app";

test("Should respond at the root ", () => {
  return request(app).get("/api/v1").expect(200);
});
