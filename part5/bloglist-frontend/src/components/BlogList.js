import React, { useState, useEffect } from "react";
import blogService from "../services/blogs";
import Blog from "./Blog";
import AddBlog from "./AddBlog";
import ToggleForm from "./ToggleForm";

const BlogList = ({ user, handleLogout, displayMessage }) => {
  const [blogs, setBlogs] = useState([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      blogs.sort((a, b) => b.likes - a.likes);
      setBlogs(blogs);
    });
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
        <AddBlog
          setBlogs={setBlogs}
          displayMessage={displayMessage}
          toggleVisibility={toggleVisibility}
        />
      </ToggleForm>
      <h2>list blogs</h2>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          setBlogs={setBlogs}
          displayMessage={displayMessage}
        />
      ))}
    </div>
  );
};

export default BlogList;
