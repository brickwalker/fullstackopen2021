const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/Blog");

const api = supertest(app);

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
  test("adding blog should work", async () => {
    const newBlog = {
      title: "Tandicook",
      author: "Olia",
      url: "https://tandicook.com.ua/",
      likes: 2000,
    };

    await api
      .post("/api/blogs")
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
        expect(newBlogReplied).toMatchObject(newBlog);
      });
  });

  test("adding blog without likes should set likes to 0", async () => {
    const newBlog = {
      title: "Tandicook",
      author: "Olia",
      url: "https://tandicook.com.ua/",
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/)
      .then((response) =>
        expect(response.body.likes).toBeGreaterThanOrEqual(0)
      );
  });

  test("should return 400 Bad Request if title and/or url properties missing", async () => {
    // const newBlog = {
    //   title: "Tandicook",
    //   author: "Olia",
    //   url: "https://tandicook.com.ua/",
    //   likes: 2000
    // };

    const newBlog = {
      author: "Olia",
      likes: 2000,
    };

    await api.post("/api/blogs").send(newBlog).expect(400);
  });
});

describe("update / delete blogs", () => {
  test("should remove blog with specific id", async () => {
    const responseAll = await api.get("/api/blogs");
    const blogToRemove = responseAll.body[0];
    await api.delete(`/api/blogs/${blogToRemove.id}`).expect(204);
  });

  test("should update blog with specific id", async () => {
    const responseAll = await api.get("/api/blogs");
    const blogToUpdate = responseAll.body[0];
    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send({ title: "Kari" })
      .expect(200)
      .then((response) => expect(response.body.title).toBe("Kari"));
  });
});

afterAll(() => {
  mongoose.connection.close();
});
