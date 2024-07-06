const supertest = require("supertest");
const { test, after, describe, beforeEach } = require("node:test");
const Blog = require("../models/blog.model");
const assert = require("node:assert");
const app = require("../app");
const api = supertest(app);
const mongoose = require("mongoose");
const helper = require("./blog.test.helper");
describe("Blog List Testing", () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
    for (let blog of helper.initialBlog) {
      let blogObject = new Blog(blog);
      await blogObject.save();
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
      };
      let response = await api
        .post("/api/blog")
        .send(newBlog)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      assert.strictEqual(response.body.likes, 0);
    });
    test("if the title or url properties are missing, throw error 404", async () => {
      const newBlogNoTitle = {
        author: "HAM",
        url: "https://test/com",
      };
      await api
        .post("/api/blog")
        .send(newBlogNoTitle)
        .expect(400)
        .expect("Content-Type", /application\/json/);
      const newBlogNoUrl = {
        title: "UNTUK TEST",
        author: "HP",
      };
      await api
        .post("/api/blog")
        .send(newBlogNoTitle)
        .expect(400)
        .expect("Content-Type", /application\/json/);
    });
  });

  describe("Testing DELETE request", () => {
    test("a blog can be deleted", async () => {
      const listBlogs = await helper.blogsInDb();
      const blogToBeDeleted = listBlogs[0];

      await api.delete(`/api/blog/${blogToBeDeleted.id}`).expect(200);

      const finalListBlog = await helper.blogsInDb();
      const titles = finalListBlog.map((r) => r.title);
      assert(!titles.includes(blogToBeDeleted.title));
      assert.strictEqual(finalListBlog.length, helper.initialBlog.length - 1);
    });

    test("Wrong id for deletion", async () => {
      await api.delete("/api/blog/invalidId").expect(400);
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
