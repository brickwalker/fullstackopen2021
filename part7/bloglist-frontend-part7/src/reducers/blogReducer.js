import blogService from "../services/blogs";

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case "INIT_BLOGS":
      return action.data;
    case "ADD_BLOG": {
      const newState = state.concat(action.data);
      newState.sort((a, b) => b.likes - a.likes);
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
    const newBlog = await blogService.addBlog({ title, author, url });
    dispatch({ type: "ADD_BLOG", data: newBlog });
  };
};

export default blogReducer;
