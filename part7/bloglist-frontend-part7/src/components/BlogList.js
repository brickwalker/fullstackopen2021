import React, { useState, useEffect } from "react";
import propTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import Blog from "./Blog";
import AddBlog from "./AddBlog";
import ToggleForm from "./ToggleForm";
import { initializeBlogs } from "../reducers/blogReducer";

const BlogList = ({ user, handleLogout }) => {
  const [visible, setVisible] = useState(false);

  const blogs = useSelector((state) => state.blogs);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, []);

  const toggleVisibility = () => setVisible(!visible);

  return (
    <div>
      <h1>blogs</h1>
      <p>
        {user} is logged in <button onClick={handleLogout}>logout</button>
      </p>
      <ToggleForm
        showButtonLabel="create new blog"
        hideButtonLabel="cancel"
        visible={visible}
        toggleVisibility={toggleVisibility}
      >
        <AddBlog toggleVisibility={toggleVisibility} />
      </ToggleForm>
      <h2>list blogs</h2>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

BlogList.propTypes = {
  user: propTypes.string.isRequired,
  handleLogout: propTypes.func.isRequired,
};

export default BlogList;
