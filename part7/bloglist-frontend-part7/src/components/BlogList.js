import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import BlogItem from "./BlogItem";
import AddBlog from "./AddBlog";
import ToggleForm from "./ToggleForm";
import { initializeBlogs } from "../reducers/blogReducer";

const BlogList = () => {
  const [visible, setVisible] = useState(false);

  const blogs = useSelector((state) => state.blogs);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, []);

  const toggleVisibility = () => setVisible(!visible);

  return (
    <div>
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
        <BlogItem key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default BlogList;
