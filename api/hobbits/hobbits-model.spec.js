const Hobbits = require("./hobbits-model.js");
const db = require("../../data/dbConfig.js");

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});

beforeAll(async () => {
  await db("hobbits").truncate();
  //   await db.seed.run();
});

afterAll(async () => {
  await db.destroy();
});

describe("hobbits model test", () => {
  describe("insert() tests", () => {
    test("should insert the correct # of records", async () => {
      await Hobbits.insert({ name: "gaffer" });
      await Hobbits.insert({ name: "sam" });

      const hobbits = await db("hobbits");
      expect(hobbits).toHaveLength(2);
    });
    test("should return the record inserted", async () => {
      hobbit = await Hobbits.insert({ name: "merryTook" });
      expect(hobbit.name).toBe("merryTook");
    });
  });
});
