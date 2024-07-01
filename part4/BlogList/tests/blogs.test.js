const supertest = require("supertest");
const { test, after, describe, beforeEach } = require("node:test");
const Blog = require("../models/blog.model");
const assert = require("node:assert");
const app = require("../app");
const api = supertest(app);
const mongoose = require("mongoose");

describe("Blog List Testing", () => {
  const initialBlog = [
    {
      title: "On my way to riches",
      author: "Abraham Naiborhu",
      url: "https://nothing.com",
      likes: 500,
    },
    {
      title: "Not the best of the world",
      author: "T. R. J.",
      url: "https://not_nothing.com",
      likes: 300,
    },
    {
      title: "How could it be so hard?",
      author: "Abraham P. N.",
      url: "https://nothingnothing.com",
      likes: 100,
    },
  ];

  beforeEach(async () => {
    await Blog.deleteMany({});
    for (let blog of initialBlog) {
      let blogObject = new Blog(blog);
      await blogObject.save();
    }
  });

  test("The blog list application returns the correct amount of blog posts.", async () => {
    const response = await api.get("/api/blog");
    assert.strictEqual(response.body.length, initialBlog.length);
  });

  test("The unique identifier property of the blog posts is named id", async () => {
    const response = await api.get("/api/blog");
    const blog = response.body[0];

    assert(blog.id !== undefined, "Blog post id is not defined");
    assert(blog._id === undefined, "Blog post _id should not be returned");
  });

  after(async () => {
    await mongoose.connection.close();
  });
});
