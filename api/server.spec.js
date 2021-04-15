const server = require("./server.js");
const request = require("supertest");
const db = require("../data/dbConfig.js");

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});

beforeEach(async () => {
  await db("hobbits").truncate();
  await db.seed.run();
});

afterAll(async () => {
  await db.destroy();
});

describe("server.js tests", () => {
  let res;
  beforeAll(async () => {
    res = await request(server).get("/");
  });

  test('environment is "testing"', () => {
    expect(process.env.DB_ENV).toBe("testing");
  });

  // return code/response
  // return value type (i.e. JSON or XML or ...)
  // return value

  // GET /
  //   describe("GET/", () => {
  //     test("returns 200", () => {
  //       return request(server)
  //         .get("/")
  //         .then((res) => {
  //           expect(res.status).toBe(200);
  //         });
  //     });

  test("returns 200, async", async () => {
    // const res = await request(server).get("/");
    expect(res.status).toBe(200);
  });

  //   });

  // returns type

  test("should return JSON", async () => {
    // const res = await request(server).get("/");
    expect(res.type).toBe("application/json");
  });

  // return shape/value

  test('should return {api:"up"}', async () => {
    expect(res.body).toEqual({ api: "up" });
  });
});
