const _ = require("lodash");

const dummy = () => 1;

const totalLikes = (blogs) => blogs.reduce((sum, cur) => (sum += cur.likes), 0);

const favoriteBlog = (blogs) => {
  return blogs.reduce((top, cur) => {
    if (top.likes !== undefined) {
      if (top.likes <= cur.likes) {
        top = { ...cur };
      }
    } else {
      top = { ...cur };
    }
    return top;
  }, {});
};

const mostBlogs = (blogs) => {
  const authorCount = _.countBy(blogs, (el) => el.author);
  const prolificAuthor = _.maxBy(
    Object.keys(authorCount),
    (el) => authorCount[el]
  );
  return {
    author: prolificAuthor,
    blogs: authorCount[prolificAuthor],
  };
};

const mostLikes = (blogs) => {
  const authors = _.groupBy(blogs, (el) => el.author);
  const authorLikes = _.mapValues(authors, (values) => {
    return values.reduce((sum, entry) => sum + entry.likes, 0);
  });
  const likedAuthor = _.maxBy(
    Object.keys(authorLikes),
    (el) => authorLikes[el]
  );
  return {
    author: likedAuthor,
    likes: authorLikes[likedAuthor],
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
};
