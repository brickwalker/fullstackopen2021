const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/User");

usersRouter.get("/", (request, response, next) => {
  User.find({})
    .then((users) => {
      response.json(users);
    })
    .catch((error) => next(error));
});

usersRouter.post("/", async (request, response, next) => {
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(request.body.password, saltRounds);

  const user = new User({
    username: request.body.username,
    name: request.body.name,
    passwordHash
  });

  user
    .save()
    .then((result) => {
      response.status(201).json(result);
    })
    .catch((error) => next(error));
});

module.exports = usersRouter;
