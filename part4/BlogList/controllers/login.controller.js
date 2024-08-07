const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const express = require("express");
const loginRouter = express.Router();
const User = require("../models/user.model");

loginRouter.post("/", async (request, response, next) => {
  try {
    const { username, password } = request.body;
    const user = await User.findOne({ username });

    const passwordCorrect =
      user === null ? false : await bcrypt.compare(password, user.passwordHash);

    if (!(user && passwordCorrect)) {
      return response.status(401).json({
        error: "Invalid username or password",
      });
    }

    const userForToken = {
      username: user.username,
      id: user._id,
    };

    const token = jwt.sign(userForToken, process.env.SECRET);
    return response.status(200).json({
      token,
      username: user.username,
      name: user.name,
      userId: user.id,
    });
  } catch (exception) {
    next(exception);
  }
});

module.exports = loginRouter;
