const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/Blog");

const api = supertest(app);

describe("blog list tests", () => {
  const initialBlogs = [
    {
      title: "Karifood",
      author: "Olga Kari",
      url: "https://karifood.com/",
      likes: 5000,
    },
    {
      title: "Klopotenko recipes",
      author: "Eugen Klopotenko",
      url: "https://klopotenko.com/uk/",
      likes: 197000,
    },
  ];

  beforeEach(async () => {
    await Blog.deleteMany({});
    for (const blog of initialBlogs) {
      const blogObject = new Blog(blog);
      await blogObject.save();
    }
  });

  test("should return correct number of blog posts", async () => {
    await api
      .get("/api/blogs")
      .expect("Content-Type", /application\/json/)
      .expect(200);
    const response = await api.get("/api/blogs");
    expect(response.body).toHaveLength(initialBlogs.length);
  });

  test("should have id property", async () => {
    const response = await api.get("/api/blogs");
    expect(response.body[0].id).toBeDefined();
  });

  afterAll(() => {
    mongoose.connection.close();
  });
});
