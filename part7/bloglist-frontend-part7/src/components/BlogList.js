import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import BlogItem from "./BlogItem";
import AddBlog from "./AddBlog";
import ToggleForm from "./ToggleForm";
import { initializeBlogs } from "../reducers/blogReducer";
import { Typography, Box } from "@mui/material";

const BlogList = () => {
  const [visible, setVisible] = useState(false);

  const blogs = useSelector((state) => state.blogs);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, []);

  const toggleVisibility = () => setVisible(!visible);

  return (
    <Box component="div" m={5}>
      <Typography variant="h3">Blog app</Typography>
      <ToggleForm
        showButtonLabel="create new blog"
        hideButtonLabel="cancel"
        visible={visible}
        toggleVisibility={toggleVisibility}
      >
        <AddBlog toggleVisibility={toggleVisibility} />
      </ToggleForm>
      <Typography variant="h4">List blogs</Typography>
      {blogs.map((blog) => (
        <BlogItem key={blog.id} blog={blog} />
      ))}
    </Box>
  );
};

export default BlogList;
