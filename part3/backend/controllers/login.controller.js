const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const express = require("express");
const loginRouter = express.Router();
const User = require("../models/user.js");

loginRouter.post("/", async (request, response) => {
  const { username, password } = request.body;
  if (!username)
    return response.status(400), json({ error: "username must be filled" });
  if (!password) return;
  const user = await User.findOne({ username });

  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);

  if (!(user && passwordCorrect))
    return response.status(401).json({
      error: "invalid username or password",
    });
  const userForToken = {
    username: user.username,
    id: user._id,
  };

  const token = jwt.sign(userForToken, process.env.SECRET, {
    expiresIn: 60 * 60,
  });

  response
    .status(200)
    .send({ token, username: user.username, name: user.name });
});

module.exports = loginRouter;
