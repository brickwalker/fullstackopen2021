import blogService from "../services/blogs";

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case "INIT_BLOGS":
      return action.data;
    case "LIKE_BLOG": {
      const newState = state.map((blog) =>
        blog.id === action.data.id
          ? { ...blog, likes: action.data.likes }
          : blog
      );
      newState.sort((a, b) => b.likes - a.likes);
      return newState;
    }
    case "DELETE_BLOG": {
      const newState = state.filter((el) => el.id !== action.data);
      return newState;
    }
    default:
      return state;
  }
};

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    blogs.sort((a, b) => b.likes - a.likes);
    dispatch({ type: "INIT_BLOGS", data: blogs });
  };
};

export const addBlog = (title, author, url) => {
  return async (dispatch) => {
    await blogService.addBlog({ title, author, url });
    const blogs = await blogService.getAll();
    blogs.sort((a, b) => b.likes - a.likes);
    dispatch({ type: "INIT_BLOGS", data: blogs });
  };
};

export const addLike = (blog) => {
  const id = blog.id;
  const blogObject = {
    title: blog.title,
    author: blog.author,
    user: blog.user.id,
    likes: blog.likes + 1,
  };
  return async (dispatch) => {
    const updatedBlog = await blogService.updateBlog(id, blogObject);
    dispatch({ type: "LIKE_BLOG", data: updatedBlog });
  };
};

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.deleteBlog(id);
    dispatch({ type: "DELETE_BLOG", data: id });
  };
};

export default blogReducer;
