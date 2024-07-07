const express = require("express");
const logger = require("./utils/logger");
const config = require("./utils/config");
const cors = require("cors");
const notesRouter = require("./controllers/notes.controller");
const userRouter = require("./controllers/user.controller");
const loginRouter = require("./controllers/login.controller");
const middleware = require("./utils/middleware");
const app = express();
const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

logger.info("connecting to", config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error connecting to MongoDB:", error.message);
  });

app.use(cors());

app.use(express.json());
app.use(middleware.requestLogger);

app.use(express.static("dist"));

app.get("/", (req, res) => {
  res.send("<h1>Hello World</h1>");
});
app.use("/api/notes", notesRouter);
app.use("/api/users", userRouter);
app.use("/api/login", loginRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
