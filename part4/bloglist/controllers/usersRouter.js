const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
require("express-async-errors");
const User = require("../models/User");

usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs", {
    title: 1,
    author: 1,
    url: 1,
    likes: 1,
  });

  response.json(users);
});

usersRouter.post("/", async (request, response, next) => {
  const pass = request.body.password;
  if (pass && pass.length >= 3) {
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(pass, saltRounds);

    const user = new User({
      username: request.body.username,
      name: request.body.name,
      passwordHash,
    });

    user
      .save()
      .then((result) => {
        response.status(201).json(result);
      })
      .catch((error) => next(error));
  } else {
    const error = {
      name: "BadPasswordError",
      message: "password missing or does not meet minimum requirement",
    };
    next(error);
  }
});

module.exports = usersRouter;
