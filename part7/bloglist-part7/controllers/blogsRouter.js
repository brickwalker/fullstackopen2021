const blogsRouter = require("express").Router();
require("express-async-errors");
const Blog = require("../models/Blog");
const User = require("../models/User");
const { extractTokenId } = require("../utils/middleware");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });

  response.json(blogs);
});

blogsRouter.post("/", extractTokenId, async (request, response) => {
  const body = request.body;
  const user = await User.findById(request.tokenId);
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

blogsRouter.delete("/:id", extractTokenId, async (request, response) => {
  const id = request.params.id;
  const blog = await Blog.findById(id);

  if (blog.user.toString() === request.tokenId) {
    const deletedBlog = await Blog.findOneAndDelete({ _id: id });
    await User.findOneAndUpdate({ blogs: id }, { $pull: { blogs: id } });
    return response.status(204).json(deletedBlog);
  }

  response.status(401).json({ error: "user not authorized" });
});

blogsRouter.put("/:id", extractTokenId, async (request, response) => {
  const id = request.params.id;
  const blog = await Blog.findById(id);

  if (blog.user.toString() === request.tokenId) {
    const result = await Blog.findOneAndUpdate({ _id: id }, request.body, {
      new: true,
    });
    return response.status(200).json(result);
  }

  response.status(401).json({ error: "user not authorized" });
});

module.exports = blogsRouter;
