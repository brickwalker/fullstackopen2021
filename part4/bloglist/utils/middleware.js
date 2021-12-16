const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
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

// This middleware must be before extractToken one and before routes
const extractTokenId = (req, res, next) => {
  if (!req.token) {
    return res.status(401).json({ error: "token missing" });
  }
  const decodedToken = jwt.verify(req.token, JWT_SECRET);
  if (decodedToken.id) {
    req.tokenId = decodedToken.id.toString();
  } else {
    req.tokenId = null;
    res.status(401).json({ error: "invalid token" });
  }
  
  next();
};

module.exports = {
  unknownEndpoint,
  errorHandler,
  extractToken,
  extractTokenId,
};
