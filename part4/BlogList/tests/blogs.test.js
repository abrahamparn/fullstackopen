const supertest = require("supertest");
const { test, after, describe, beforeEach, before } = require("node:test");
const Blog = require("../models/blog.model");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

const assert = require("node:assert");
const app = require("../app");
const api = supertest(app);
const mongoose = require("mongoose");
const helper = require("./blog.test.helper");
const userHelper = require("./users.test.helper");
describe("Blog List Testing", () => {
  let userTokenOne = null;
  let userTokenTwo = null;
  let userOne = null;
  let userTwo = null;
  before(async () => {
    // Create users once before all tests
    await User.deleteMany({});
    const users = [
      { username: "root", name: "Root User", password: "secret" },
      { username: "user2", name: "Second User", password: "secret2" },
    ];
    let responseUserOne = await api.post("/api/users").send(users[0]);
    userOne = responseUserOne.body;

    let responseUserTwo = await api.post("/api/users").send(users[1]);
    userTwo = responseUserTwo.body;

    let responseTokenOne = await api.post("/api/login").send(users[0]);
    userTokenOne = responseTokenOne.body.token;
    let responseTokenTwo = await api.post("/api/login").send(users[1]);
    userTokenTwo = responseTokenTwo.body.token;
  });
  beforeEach(async () => {
    await Blog.deleteMany({});
    for (let blog of helper.initialBlog) {
      await api
        .post("/api/blog")
        .set("Authorization", `Bearer ${userTokenOne}`)
        .send({ ...blog, userId: userOne.id });
    }
  });

  describe("Testing GET request", () => {
    test("The blog list application returns the correct amount of blog posts.", async () => {
      const theNotes = await helper.blogsInDb();
      assert.strictEqual(theNotes.length, helper.initialBlog.length);
    });
    test("The unique identifier property of the blog posts is named id", async () => {
      const response = await api.get("/api/blog");
      const blog = response.body[0];

      assert(blog.id !== undefined, "Blog post id is not defined");
      assert(blog._id === undefined, "Blog post _id should not be returned");
    });
  });

  describe("Testing POST request", () => {
    test("is userId is nothing, return error", async () => {
      const newBlog = {
        title: "UNTUK TEST",
        author: "HP",
        url: "https://test.com",
        likes: 1000,
      };

      await api
        .post("/api/blog")
        .set("Authorization", `Bearer ${userTokenOne}`)
        .send(newBlog)
        .expect(400)
        .expect("Content-Type", /application\/json/);

      let theNotes = await helper.blogsInDb();
      assert.strictEqual(theNotes.length, helper.initialBlog.length);
    });

    test("If token is missing, return error", async () => {
      const newBlog = {
        title: "UNTUK TEST",
        author: "HP",
        url: "https://test.com",
        likes: 1000,
        userId: userOne.id,
      };

      await api
        .post("/api/blog")
        .send(newBlog)
        .expect(401)
        .expect("Content-Type", /application\/json/);

      let theNotes = await helper.blogsInDb();
      assert.strictEqual(theNotes.length, helper.initialBlog.length);
    });

    test("Successfully create a post with http", async () => {
      const newBlog = {
        title: "UNTUK TEST",
        author: "HP",
        url: "https://test.com",
        likes: 1000,
        userId: userOne.id,
      };

      await api
        .post("/api/blog")
        .set("Authorization", `Bearer ${userTokenOne}`)
        .send(newBlog)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      let theNotes = await helper.blogsInDb();
      assert.strictEqual(theNotes.length, helper.initialBlog.length + 1);

      let isExists = theNotes.map((m) => m.title);
      assert(isExists.includes("UNTUK TEST"));
    });

    test("If the likes property is missing from the request, it will default to the value 0", async () => {
      const newBlog = {
        title: "UNTUK TEST",
        author: "HP",
        url: "https://test.com",
        userId: userOne.id,
      };
      let response = await api
        .post("/api/blog")
        .set("Authorization", `Bearer ${userTokenOne}`)
        .send(newBlog)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      assert.strictEqual(response.body.likes, 0);
    });

    test("if the title or url properties are missing, throw error 404", async () => {
      const newBlogNoTitle = {
        author: "HAM",
        url: "https://test/com",
        userId: userOne.id,
      };
      await api
        .post("/api/blog")
        .set("Authorization", `Bearer ${userTokenOne}`)
        .send(newBlogNoTitle)
        .expect(400)
        .expect("Content-Type", /application\/json/);
      const newBlogNoUrl = {
        title: "UNTUK TEST",
        author: "HP",
        userId: userOne.id,
      };
      await api
        .post("/api/blog")
        .set("Authorization", `Bearer ${userTokenOne}`)
        .send(newBlogNoTitle)
        .expect(400)
        .expect("Content-Type", /application\/json/);
    });
  });

  describe("Testing DELETE request", () => {
    test("a blog can be deleted", async () => {
      const listBlogs = await helper.blogsInDb();
      const blogToBeDeleted = listBlogs[0];

      await api
        .delete(`/api/blog/${blogToBeDeleted.id}`)
        .set("Authorization", `Bearer ${userTokenOne}`)
        .expect(200);

      const finalListBlog = await helper.blogsInDb();
      const titles = finalListBlog.map((r) => r.title);
      assert(!titles.includes(blogToBeDeleted.title));
      assert.strictEqual(finalListBlog.length, helper.initialBlog.length - 1);
    });

    test("only the creator can delete blog", async () => {
      const listBlogs = await helper.blogsInDb();
      const blogToBeDeleted = listBlogs[0];

      await api
        .delete(`/api/blog/${blogToBeDeleted.id}`)
        .set("Authorization", `Bearer ${userTokenTwo}`)
        .expect(403);

      const finalListBlog = await helper.blogsInDb();
      const titles = finalListBlog.map((r) => r.title);
      assert(titles.includes(blogToBeDeleted.title));
      assert.strictEqual(finalListBlog.length, helper.initialBlog.length);
    });

    test("must include token when deleting", async () => {
      const listBlogs = await helper.blogsInDb();
      const blogToBeDeleted = listBlogs[0];

      await api.delete(`/api/blog/${blogToBeDeleted.id}`).expect(401);

      const finalListBlog = await helper.blogsInDb();
      const titles = finalListBlog.map((r) => r.title);
      assert(titles.includes(blogToBeDeleted.title));
      assert.strictEqual(finalListBlog.length, helper.initialBlog.length);
    });

    test("Only existing blog that could be deleted", async () => {
      const listBlogs = await helper.blogsInDb();
      const blogToBeDeleted = listBlogs[0];

      await api
        .delete(`/api/blog/${blogToBeDeleted.id}`)
        .set("Authorization", `Bearer ${userTokenOne}`)
        .expect(200);

      await api
        .delete(`/api/blog/${blogToBeDeleted.id}`)
        .set("Authorization", `Bearer ${userTokenOne}`)
        .expect(400);
    });
    test("Wrong id for deletion returns error", async () => {
      await api
        .delete("/api/blog/invalidId")
        .set("Authorization", `Bearer ${userTokenOne}`)
        .expect(400);
    });
  });

  describe("Testing PUT request", () => {
    test("a blog can be updated", async () => {
      const listBlogs = await helper.blogsInDb();
      const blogToBeUpdated = listBlogs[0];

      const updatedBlog = {
        ...blogToBeUpdated,
        likes: blogToBeUpdated.likes + 1,
      };

      const response = await api
        .put(`/api/blog/${blogToBeUpdated.id}`)
        .send(updatedBlog)
        .expect(200)
        .expect("Content-Type", /application\/json/);

      assert.strictEqual(response.body.likes, blogToBeUpdated.likes + 1);
    });

    test("updating a blog with a wrong id", async () => {
      let invalidId = "asdfasdfasdf";
      await api.put(`/api/blog/${invalidId}`).expect(400);
    });
  });

  after(async () => {
    await mongoose.connection.close();
  });
});
