const supertest = require("supertest");
const { test, after, describe, beforeEach } = require("node:test");
const Blog = require("../models/blog.model");
const assert = require("node:assert");
const app = require("../app");
const api = supertest(app);
const mongoose = require("mongoose");
const helper = require("./blog.helper.test");
describe("Blog List Testing", () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
    for (let blog of helper.initialBlog) {
      let blogObject = new Blog(blog);
      await blogObject.save();
    }
  });

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

  test("Successfully create a post with http", async () => {
    const newBlog = {
      title: "UNTUK TEST",
      author: "HP",
      url: "https://test.com",
      likes: 1000,
    };
    await api
      .post("/api/blog")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);
    let length = await api.get("/api/blog");
    assert.strictEqual(length.body.length, helper.initialBlog.length + 1);
  });

  after(async () => {
    await mongoose.connection.close();
  });
});
