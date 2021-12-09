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

module.exports = {
  unknownEndpoint,
  errorHandler,
};
