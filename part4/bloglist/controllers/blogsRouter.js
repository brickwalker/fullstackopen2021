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
  const blog = new Blog(request.body);

  blog
    .save()
    .then((result) => {
      response.status(201).json(result);
    })
    .catch((error) => next(error));
});

blogsRouter.delete("/:id", (request, response, next) => {
  const id = request.params.id;

  Blog.findOneAndDelete({ _id: id })
    .then((result) => response.status(204).json(result))
    .catch((error) => next(error));
});

blogsRouter.put("/:id", (request, response, next) => {
  const id = request.params.id;

  Blog.findOneAndUpdate({ _id: id }, request.body, {new: true})
    .then((result) => response.status(200).json(result))
    .catch((error) => next(error));
});

module.exports = blogsRouter;
