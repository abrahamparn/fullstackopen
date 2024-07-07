const bcrypt = require("bcrypt");
const User = require("../models/user");

const { test, after, describe, beforeEach } = require("node:test");
const assert = require("node:assert");
const helper = require("./test_helper");

const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);

describe("when there is initially one user in db", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("secret", 10);
    const user = new User({ username: "root", name: "root", passwordHash });
    await user.save();
  });
  describe("POST REQUEST", () => {
    test("Creation succeeds with a fresh usrename", async () => {
      const userAtStart = await helper.userInDb();

      const newUser = {
        username: "Abraham",
        name: "Abraham Naiborhu",
        password: "secret",
      };

      await api
        .post("/api/users")
        .send(newUser)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      const userAtEnd = await helper.userInDb();
      assert.strictEqual(userAtEnd.length, userAtStart.length + 1);

      const usernames = userAtEnd.map((u) => u.username);
      assert(usernames.includes(newUser.username));
    });

    test("Creation fails with proper statuscode and message if username already taken", async () => {
      const userAtStart = await helper.userInDb();

      const newUser = {
        username: "root",
        name: "abraham",
        password: "secret",
      };

      const result = await api
        .post("/api/users")
        .send(newUser)
        .expect(400)
        .expect("Content-Type", /application\/json/);
      const userAtEnd = await helper.userInDb();
      assert(result.body.error.includes("expected `username` to be unique"));

      assert.strictEqual(userAtEnd.length, userAtStart.length);
    });

    test("Correctly fail if username not long enough", async () => {
      const userAtStart = await helper.userInDb();

      const newUser = {
        username: "roo",
        name: "abraham",
        password: "secret",
      };

      await api
        .post("/api/users")
        .send(newUser)
        .expect(400)
        .expect("Content-Type", /application\/json/);

      const userAtEnd = await helper.userInDb();
      assert.strictEqual(userAtStart.length, userAtEnd.length);
    });
  });

  describe("GET REQUEST", () => {
    test("Correctly get one user", async () => {
      const userAtStart = await helper.userInDb();
      const allUser = await api.get("/api/users");

      assert.strictEqual(userAtStart.length, allUser.body.length);
    });

    test("Users are returned as json", async () => {
      await api
        .get("/api/users")
        .expect(200)
        .expect("Content-Type", /application\/json/);
    });

    test("A specific user is within the returned users", async () => {
      const response = await api.get("/api/users");

      const usernames = response.body.map((u) => u.username);
      assert(usernames.includes("root"));
    });
  });

  after(async () => {
    await mongoose.connection.close();
  });
});
