const listHelper = require("../utils/list_helper");

test("dummy returns one", () => {
  const result = listHelper.dummy();
  expect(result).toBe(1);
});

describe("total likes", () => {
  const listWithOneBlog = [
    {
      title: "Karifood",
      author: "Olga Kari",
      url: "https://karifood.com/",
      likes: 5000,
      id: "61b1d4f6e937420f72deebff",
    },
  ];

  test("should be blog likes when list has one blog", () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    expect(result).toBe(5000);
  });
});
