const logger = require("./logger");

const unknownEndpoint = (req, res) =>
  res.status(404).send({ error: "unknown endpoint" });

const errorHandler = (err, req, res, next) => {
  logger.error(err.message);
  res.status(400);
  if (err.name === "CastError") {
    res.json({ error: "malformatted id" });
  } else {
    res.json({ error: err.message });
  }
  next(err);
};

const extractToken = (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (authHeader && authHeader.toLowerCase().startsWith("bearer ")) {
    req.token = authHeader.substring(7);
  } else {
    req.token = null;
  }
  next();
};

module.exports = {
  unknownEndpoint,
  errorHandler,
  extractToken,
};
