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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
