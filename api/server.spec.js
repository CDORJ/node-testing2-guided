const server = require("./server.js");
const request = require("supertest");
const db = require("../data/dbConfig.js");

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});

beforeAll(async () => {
  await db("hobbits").truncate();
});

afterAll(async () => {
  await db.destroy();
});

describe("server.js test", () => {
  test('environment is "testing"', () => {
    expect(process.env.DB_ENV).toBe("testing");
  });

  // return code / response
  // return value type (i.e. JSON or XML or ...)
  // return value

  // GET /
  describe("GET /", () => {
    let res;
    beforeAll(async () => {
      res = await request(server).get("/");
    });
    //return status value
    test("returns 200", async () => {
      //   const res = await request(server).get("/");
      expect(res.status).toBe(200);
    });
    //return type
    test("should return JSON", async () => {
      //   const res = await request(server).get("/");
      expect(res.type).toBe("application/json");
    });

    //return shape/value
    test("should return {api:up}", async () => {
      expect(res.body).toEqual({ api: "up" });
    });
  });
});
