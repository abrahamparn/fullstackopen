const express = require("express");
const testRouter = express.Router();

const Note = require("../models/note");
const User = require("../models/user");

testRouter.get("/reset", async (request, response) => {
  return response.status(200).json({
    message: "success",
  });
});
testRouter.post("/reset", async (request, response) => {
  await Note.deleteMany({});
  await User.deleteMany({});
  return response.status(204).end();
});

module.exports = testRouter;
