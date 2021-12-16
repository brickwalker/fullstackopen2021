const blogsRouter = require("express").Router();
require("express-async-errors");
const Blog = require("../models/Blog");
const User = require("../models/User");

// This section utilizes express-async-errors which automatically passes errors to next
blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });

  response.json(blogs);
});

// This section utilizes express-async-errors which automatically passes errors to next
blogsRouter.post("/", async (request, response) => {
  const body = request.body;
  const user = await User.findById(body.userId);
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
  });
  const savedBlog = await blog.save();
  await user.updateOne({ $push: { blogs: savedBlog._id } });

  response.status(201).json(savedBlog);
});

// This section utilizes express-async-errors which automatically passes errors to next
blogsRouter.delete("/:id", async (request, response) => {
  const id = request.params.id;

  const deletedBlog = await Blog.findOneAndDelete({ _id: id });

  await User.findOneAndUpdate({ blogs: id }, { $pull: { blogs: id } });

  response.status(204).json(deletedBlog);
});

blogsRouter.put("/:id", (request, response, next) => {
  const id = request.params.id;

  Blog.findOneAndUpdate({ _id: id }, request.body, { new: true })
    .then((result) => response.status(200).json(result))
    .catch((error) => next(error));
});

module.exports = blogsRouter;
