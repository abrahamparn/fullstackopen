const logger = require("./logger");

const requestLogger = (request, response, next) => {
  logger.info("Method:", request.method);
  logger.info("Path:  ", request.path);
  logger.info("Body:  ", request.body);
  logger.info("---");
  next();
};

const unknownEndpoint = (req, res) => {
  return res.status(404).send({ error: "unkown endpoint" });
};

const errorHandler = (error, req, res, next) => {
  if (error.name === "CastError") {
    return res.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return res.status(400).json({ error: error.message });
  } else if (
    error.name === "MongoServerError" &&
    error.message.includes("E11000 duplicate key error")
  ) {
    return res.status(400).json({ error: "expected `username` to be unique" });
  } else if (error.name == "JsonWebTokenError") {
    return res.status(401).json({ error: "token invalid" });
  } else if (error.name === "TokenExpiredError") {
    return res.status(401).json({
      errr: "token expired",
    });
  } else if (error.name === "MongooseError") {
    return res.status(500).json({
      error: "Cannot talk to database for now",
    });
  }
  next(error);
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
};
