const bcrypt = require("bcrypt");
const User = require("../models/user.model");

const { test, after, describe, beforeEach } = require("node:test");
const assert = require("node:assert");
const helper = require("./users.test.helper");

const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);

describe("When there is initially one user in db", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const user = new User({
      username: "root",
      name: "root",
      password: "secret",
    });

    await user.save();
  });

  describe("POST REQUEST", async () => {
    test("Creation succeeds with a fresh username", async () => {
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

    test("Creation will fail because of same username", async () => {
      const userAtStart = await helper.userInDb();

      const existingUser = {
        username: userAtStart[0].username,
        name: userAtStart[0].name,
        password: "password",
      };

      let response = await api
        .post("/api/users")
        .send(existingUser)
        .expect(400)
        .expect("Content-Type", /application\/json/);
      assert.strictEqual(
        response.body.error,
        "expected `username` to be unique"
      );
      const userAtEnd = await helper.userInDb();
      assert.strictEqual(userAtStart.length, userAtEnd.length);
    });

    test("Creation will fail when username less than 3 characters", async () => {
      const userAtStart = await helper.userInDb();

      const existingUser = {
        username: "ap",
        name: "Abraham Naiborhu",
        password: "password",
      };

      await api
        .post("/api/users")
        .send(existingUser)
        .expect(400)
        .expect("Content-Type", /application\/json/);

      const userAtEnd = await helper.userInDb();
      assert.strictEqual(userAtStart.length, userAtEnd.length);
    });

    test("Creation will fail when password less than 3 characters", async () => {
      const userAtStart = await helper.userInDb();

      const existingUser = {
        username: "theDomu",
        name: "Abraham Naiborhu",
        password: "pa",
      };

      let response = await api
        .post("/api/users")
        .send(existingUser)
        .expect(400)
        .expect("Content-Type", /application\/json/);

      const userAtEnd = await helper.userInDb();
      assert.strictEqual(userAtStart.length, userAtEnd.length);

      assert.strictEqual(
        response.body.error,
        "password's length must be more than 4 characters"
      );
    });
  });
  describe("GET REQUEST", () => {
    test("Returns all users in the database", async () => {
      const userAtStart = await helper.userInDb();

      const response = await api
        .get("/api/users")
        .expect(200)
        .expect("Content-Type", /application\/json/);

      assert.strictEqual(response.body.length, userAtStart.length);
    });

    test("The return user has username, name, blog, and id", async () => {
      let response = await api
        .get("/api/users")
        .expect(200)
        .expect("Content-Type", /application\/json/);

      response.body.forEach((user) => {
        assert(user.username);
        assert(user.name);
        assert(Array.isArray(user.blogs));
        assert(user.id);
      });
    });
  });
  describe("DELET REQUEST", () => {});
  describe("PUT REQUEST", () => {});
});
