const logger = require("./logger");
const jwt = require("jsonwebtoken");

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

const tokenExtractor = (req, res, next) => {
  try {
    const authorization = req.get("authorization");
    if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
      req.token = authorization.slice(7);
    } else {
      req.token = null; // Explicitly set token to null if not present
    }
  } catch (error) {
    req.token = null; // Handle any unexpected errors gracefully
  } finally {
    next(); // Ensure the next middleware is called
  }
};

const userExtractor = (req, res, next) => {
  try {
    const token = req.token;
    if (token) {
      const decodedToken = jwt.verify(token, process.env.SECRET);
      req.tokenUsername = decodedToken.user;
      req.tokenUserId = decodedToken.id;
    } else {
      req.tokenUser = ntokenUl;
      req.tokenUserId = null;
    }
  } catch (exception) {
    req.tokenUser = null;
    req.tokenUserId = null;
  } finally {
    next();
  }
};
const errorHandler = (error, req, res, next) => {
  logger.error(error.message);

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
  }

  next(error);
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor,
};
