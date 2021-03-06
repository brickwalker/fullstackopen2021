const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const User = require("../models/User");

const api = supertest(app);

const initialUsers = [
  {
    username: "brickwalker",
    name: "Artem Nedostup",
    password: "1a2b3c4d",
  },
  {
    username: "alpish",
    name: "Sasha P",
    password: "4a3b2c1d",
  },
];

beforeEach(async () => {
  await User.deleteMany({});
  for (const user of initialUsers) {
    await api.post("/api/users").send(user);
  }
});

describe("user creation", () => {
  test("should respond with correct header and status code", async () => {
    await api
      .get("/api/users")
      .expect("Content-Type", /application\/json/)
      .expect(200);
  });

  test("should respond with initial number of users", async () => {
    const response = await api.get("/api/users");
    expect(response.body.length).toBe(2);
  });

  test("should respond without password hash", async () => {
    const response = await api.get("/api/users");
    expect(response.body[0].passwordHash).toBeUndefined();
  });

  test("should not add user if no password specified", async () => {
    const newUserNoPassword = {
      username: "bigguy",
      name: "Solter Amonis",
    };
    const postResponse = await api.post("/api/users").send(newUserNoPassword).expect(400);
    expect(postResponse.body.error).toBeDefined();
    const getResponse = await api.get("/api/users");
    expect(getResponse.body.length).toBe(2);
  });

  test("should not add user if password < 3 characters", async () => {
    const newUserNoPassword = {
      username: "bigguy",
      name: "Solter Amonis",
      password: "1"
    };
    const postResponse = await api.post("/api/users").send(newUserNoPassword).expect(400);
    expect(postResponse.body.error).toBeDefined();
    const getResponse = await api.get("/api/users");
    expect(getResponse.body.length).toBe(2);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
