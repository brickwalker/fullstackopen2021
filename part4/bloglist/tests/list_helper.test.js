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

describe("most likes", () => {
  const listFavorites = [
    {
      title: "Karifood",
      author: "Olga Kari",
      url: "https://karifood.com/",
      likes: 5000,
      id: "61b1d4f6e937420f72deebff",
    },
    {
      title: "Klopotenko recipes",
      author: "Eugen Klopotenko",
      url: "https://klopotenko.com/uk/",
      likes: 197000,
      id: "61b1d5c4e937420f72deec02",
    },
  ];

  test("should be specific blog with most likes", () => {
    const favBlog = {
      title: "Klopotenko recipes",
      author: "Eugen Klopotenko",
      url: "https://klopotenko.com/uk/",
      likes: 197000,
      id: "61b1d5c4e937420f72deec02",
    };

    const result = listHelper.favoriteBlog(listFavorites);
    expect(result).toEqual(favBlog);
  });
});

describe("prolific author", () => {
  const allBlogs = [
    {
      title: "Karifood",
      author: "Olga Kari",
      url: "https://karifood.com/",
      likes: 5000,
      id: "61b1d4f6e937420f72deebff",
    },
    {
      title: "Klopotenko recipes",
      author: "Eugen Klopotenko",
      url: "https://klopotenko.com/uk/",
      likes: 197000,
      id: "61b1d5c4e937420f72deec02",
    },
    {
      title: "Klopotenko recipes",
      author: "Eugen Klopotenko",
      url: "https://klopotenko.com/",
      likes: 197000,
      id: "61b1fd67e46123ce60178331",
    },
  ];

  test("should return author with most blogs", () => {
    const prolificAuthor = {
      author: "Eugen Klopotenko",
      blogs: 2,
    };

    const result = listHelper.mostBlogs(allBlogs);
    expect(result).toEqual(prolificAuthor);
  });
});
