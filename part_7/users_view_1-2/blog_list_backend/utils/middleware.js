const logger = require("./logger");
const jwt = require("jsonwebtoken");

const requestLogger = (request, response, next) => {
  logger.info("Method:", request.method);
  logger.info("Path:", request.path);
  logger.info("Body:", request.body);
  logger.info("---");
  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

const userExtractor = (request, response, next) => {
  const authorization = request.get("authorization");
  let token = null;

  if (authorization && authorization.startsWith("Bearer")) {
    token = authorization.replace("Bearer ", "");
  }

  if (token) {
    const decodedToken = jwt.verify(token, process.env.SECRET);
    request.user = decodedToken.id;
  } else {
    request.user = null;
  }

  next();
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  userExtractor,
};
