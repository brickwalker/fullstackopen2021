const blogsRouter = require("express").Router();
const Blog = require("../models/Blog");

blogsRouter.get("/", (request, response, next) => {
  Blog.find({})
    .then((blogs) => {
      response.json(blogs);
    })
    .catch((error) => next(error));
});

blogsRouter.post("/", (request, response, next) => {
  const postData = { ...request.body };
  if (!(postData.likes >= 0)) {
    postData.likes = 0;
  }

  const blog = new Blog(postData);

  blog
    .save()
    .then((result) => {
      response.status(201).json(result);
    })
    .catch((error) => next(error));
});

module.exports = blogsRouter;
