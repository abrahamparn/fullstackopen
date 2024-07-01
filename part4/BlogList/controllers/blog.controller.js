const express = require("express");
const blogRouter = express.Router();
const Blog = require("../models/blog.model");

blogRouter.get("/", async (request, response, next) => {
  try {
    let result = await Blog.find({});
    return response.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

blogRouter.get("/:id", async (request, response, next) => {
  try {
    let result = await Blog.findById(request.params.id);
    response.json(result);
  } catch (err) {
    next(err);
  }
});

blogRouter.post("/", async (request, response, next) => {
  try {
    const { title, author, url, likes } = request.body;

    if (!title || !url) {
      return response.status(400).json({ error: "title and url are required" });
    }

    const blog = new Blog({
      title,
      author,
      url,
      likes: likes === undefined ? 0 : likes,
    });

    const resultBlog = await blog.save();
    return response.status(201).json(resultBlog);
  } catch (err) {
    next(err);
  }
});

blogRouter.delete("/:id", async (request, response, next) => {
  try {
    const result = await Blog.findById(request.params.id);
    if (!result) {
      return response.status(400).json({ message: "The blog does not exist" });
    }
    await Blog.findByIdAndDelete(request.params.id);
    response.status(200).json(result).end();
  } catch (exception) {
    next(exception);
  }
});

blogRouter.put("/:id", async (request, response, next) => {
  try {
    const { title, author, url, likes } = request.body;

    const result = await Blog.findById(request.params.id);
    if (!result) {
      return response.status(400).json({ message: "The blog does not exist" });
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      request.params.id,
      { title, author, url, likes },
      { new: true, runValidators: true, context: "query" }
    );
    response.status(200).json(updatedBlog);
  } catch (exception) {
    next(exception);
  }
});

module.exports = blogRouter;
