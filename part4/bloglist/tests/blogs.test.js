const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/Blog");
const User = require("../models/User");
const { TEMP_TOKEN } = require("../utils/config");

const api = supertest(app);

const initialBlogs = [
  {
    title: "Karifood",
    author: "Olga Kari",
    url: "https://karifood.com/",
    likes: 5000,
    user: "61bb943dd80882e6f38f9f22",
  },
  {
    title: "Klopotenko recipes",
    author: "Eugen Klopotenko",
    url: "https://klopotenko.com/uk/",
    likes: 197000,
    user: "61bb943dd80882e6f38f9f22",
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});
  await User.updateMany({}, { $set: { blogs: [] } });
  for (const blog of initialBlogs) {
    const blogObject = new Blog(blog);
    const savedBlog = await blogObject.save();
    await User.updateOne(
      { _id: blog.user },
      { $push: { blogs: savedBlog._id } }
    );
  }
});

describe("get blogs", () => {
  test("should return correct number of blog posts", async () => {
    await api
      .get("/api/blogs")
      .expect("Content-Type", /application\/json/)
      .expect(200)
      .then((response) =>
        expect(response.body).toHaveLength(initialBlogs.length)
      );
  });

  test("blog entry should have id property", async () => {
    const response = await api.get("/api/blogs");
    expect(response.body[0].id).toBeDefined();
  });
});

describe("add blogs", () => {
  test("should fail with status code 401 if token not provided", async () => {
    await api.post("/api/blogs").send({ property: "value" }).expect(401);
  });

  test("adding blog should work", async () => {
    const newBlog = {
      title: "Tandicook",
      author: "Olia",
      url: "https://tandicook.com.ua/",
      likes: 2000,
      userId: "61bb943dd80882e6f38f9f22",
    };

    await api
      .post("/api/blogs")
      .set({ "Content-Type": "application/json", Authorization: TEMP_TOKEN })
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    await api
      .get("/api/blogs")
      .expect("Content-Type", /application\/json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveLength(initialBlogs.length + 1);
        const newBlogReplied = response.body.filter(
          (el) => el.url === "https://tandicook.com.ua/"
        )[0];

        // This replaces userId property with name property of same content
        const { userId, ...newBlogNormalized } = newBlog;
        newBlogNormalized.user = { id: userId };
        expect(newBlogReplied).toMatchObject(newBlogNormalized);
      });
  });

  test("adding blog without likes should set likes to 0", async () => {
    const newBlog = {
      title: "Tandicook",
      author: "Olia",
      url: "https://tandicook.com.ua/",
      userId: "61bb943dd80882e6f38f9f22",
    };

    await api
      .post("/api/blogs")
      .set({ "Content-Type": "application/json", Authorization: TEMP_TOKEN })
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/)
      .then((response) => expect(response.body.likes).toBe(0));
  });

  test("should return 400 Bad Request if title / url / userId properties missing", async () => {
    const newBlog = {
      author: "Olia",
      likes: 2000,
    };

    await api
      .post("/api/blogs")
      .set({ "Content-Type": "application/json", Authorization: TEMP_TOKEN })
      .send(newBlog)
      .expect(400);
  });
});

describe("update / delete blogs", () => {
  test("should remove blog with specific id", async () => {
    const responseAll = await api.get("/api/blogs");
    const blogToRemove = responseAll.body[0];
    await api
      .delete(`/api/blogs/${blogToRemove.id}`)
      .set({ "Content-Type": "application/json", Authorization: TEMP_TOKEN })
      .expect(204);
  });

  test("should update blog with specific id", async () => {
    const responseAll = await api.get("/api/blogs");
    const blogToUpdate = responseAll.body[0];
    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .set({ "Content-Type": "application/json", Authorization: TEMP_TOKEN })
      .send({ title: "Kari" })
      .expect(200)
      .then((response) => expect(response.body.title).toBe("Kari"));
  });
});

afterAll(() => {
  mongoose.connection.close();
});
