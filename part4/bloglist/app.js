const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");
const logger = require("./utils/logger");
const { MONGO_URI } = require("./utils/config");
const blogsRouter = require("./controllers/blogsRouter");
const usersRouter = require("./controllers/usersRouter");
const { unknownEndpoint, errorHandler } = require("./utils/middleware");

const app = express();

mongoose
  .connect(MONGO_URI)
  .then(() => logger.info("Connected to MongoDB"))
  .catch(() => logger.error("Cannot connect to MongoDB"));

app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());
app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);
app.use(unknownEndpoint);
app.use(errorHandler);

module.exports = app;
