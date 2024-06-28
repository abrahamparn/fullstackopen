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
    const body = request.body;
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
    });

    let resultBlog = await blog.save();
    return response.status(201).json(resultBlog);
  } catch (err) {
    next(err);
  }
});

module.exports = blogRouter;
