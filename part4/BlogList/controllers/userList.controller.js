const express = require("express");
const userListRouter = express.Router();
const User = require("../models/user.model");
const Blog = require("../models/blog.model");

userListRouter.get("/", async (request, response, next) => {
  try {
    // Fetch all users and populate their blogs
    const users = await User.find({}).populate("blogs", { title: 1, author: 1, url: 1 });
    // Map over the users to include the blog count
    const usersWithBlogCount = users.map((user) => ({
      id: user.id,
      username: user.username,
      name: user.name,
      blogCount: user.blogs.length,
    }));

    // Send the response
    response.json(usersWithBlogCount);
  } catch (exception) {
    next(exception);
  }
});

userListRouter.get("/:id", async (request, response, next) => {
  try {
    const user = await User.findById(request.params.id).populate("blogs", {
      title: 1,
      author: 1,
      url: 1,
    });

    if (!user) {
      response.status(400).json({ error: "User not found" });
    }
    response.json({
      id: user.id,
      username: user.username,
      name: user.name,
      blogs: user.blogs,
    });
  } catch (exception) {
    console.error(exception);
    next(exception);
  }
});

module.exports = userListRouter;
