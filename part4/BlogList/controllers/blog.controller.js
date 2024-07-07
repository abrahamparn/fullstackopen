const express = require("express");
const blogRouter = express.Router();
const Blog = require("../models/blog.model");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

blogRouter.get("/", async (request, response, next) => {
  try {
    let result = await Blog.find({}).populate("user", {
      username: 1,
      name: 1,
    });
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
    const { title, author, url, likes, userId } = request.body;

    let tokenUserId = request.tokenUserId; //The one whosets the request.userId is userExtractor middleware
    const user = await User.findById(userId);

    if (!title || !url) {
      return response.status(400).json({ error: "title and url are required" });
    }
    if (!tokenUserId) {
      return response.status(401).json({ error: "Invalid Token" });
    }
    if (!user) {
      return response.status(400).json({ error: "Missing userId" });
    }

    const blog = new Blog({
      title,
      author,
      url,
      likes: likes === undefined ? 0 : likes,
      user: user.id,
    });

    const savedBlog = await blog.save();

    user.blogs = user.blogs.concat(savedBlog._id);
    user.save();

    return response.status(201).json(savedBlog);
  } catch (err) {
    next(err);
  }
});

blogRouter.delete("/:id", async (request, response, next) => {
  try {
    let tokenUserId = request.tokenUserId; //The one whosets the request.userId is userExtractor middleware
    let userExists = await User.findById(tokenUserId);

    if (!userExists) {
      return response.status(401).json({ error: "Invalid Token" });
    }

    const result = await Blog.findById(request.params.id);

    if (!result) {
      return response.status(400).json({ error: "The blog does not exist" });
    }

    if (userExists.id.toString() !== result.user.toString()) {
      return response.status(403).json({
        error: "Only the creator can delete this blog",
      });
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
