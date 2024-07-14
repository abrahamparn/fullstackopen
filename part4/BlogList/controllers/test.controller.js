const express = require("express");
const testRouter = express.Router();
const Blog = require("../models/blog.model");
const User = require("../models/user.model");

testRouter.get("/", (request, response) => {
  return response.status(200).json({
    message: "Successful calling test api",
  });
});

testRouter.post("/reset", async (request, response) => {
  await Blog.deleteMany({});
  await User.deleteMany({});
  return response.status(204).end();
});

module.exports = testRouter;
