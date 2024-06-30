const { test, after, describe } = require("node:test");
const assert = require("node:assert");

const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);

describe("Notes testing", () => {
  test("notes are returned as json", async () => {
    await api
      .get("/api/notes")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("there are two notes", async () => {
    const response = await api.get("/api/notes");
    assert.strictEqual(response.body.length, 4);
  });

  test("the first note is about Abraham Naiborhu", async () => {
    const response = await api.get("/api/notes");
    const contents = response.body.map((e) => e.content);
    assert.strictEqual(contents.includes("Abraham Naiborhu"), true);
  });

  after(async () => {
    await mongoose.connection.close();
  });
});
