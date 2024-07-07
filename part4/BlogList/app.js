const express = require("express");
const logger = require("./utils/logger");
const config = require("./utils/config");
const middleware = require("./utils/middleware");
const blogRouter = require("./controllers/blog.controller");
const userRouter = require("./controllers/users.controller");
const loginRouter = require("./controllers/login.controller");
const cors = require("cors");

//INSERT ROUTER

// mouting express to app variable
const app = express();

//mongoose stups
const mongoose = require("mongoose");
mongoose.set("strictQuery", config.MONGODB_URI);
logger.info("connecting to", config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error connecting to MongoDB: ", error.message);
  });

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);

app.get("/test", (request, response) => {
  return response.status(200).json({
    message: "success",
  });
});

app.use("/api/blog", blogRouter);
app.use("/api/users", userRouter);
app.use("/api/login", loginRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
