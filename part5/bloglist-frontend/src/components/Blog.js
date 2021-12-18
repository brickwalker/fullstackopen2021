import React, { useState } from "react";
import ToggleForm from "./ToggleForm";
import blogService from "../services/blogs";

const Blog = ({ blog, setBlogs, displayMessage }) => {
  const [visible, setVisible] = useState(false);
  const [likes, setLikes] = useState(blog.likes);

  const blogStyle = {
    borderStyle: "solid",
    borderWidth: 1,
    margin: 1,
    padding: 1,
  };

  const addLike = async () => {
    const id = blog.id;
    const blogObject = {
      title: blog.title,
      author: blog.author,
      user: blog.user.id,
      likes: blog.likes + 1,
    };

    try {
      await blogService.updateBlog(id, blogObject);
      setLikes(likes + 1)
    } catch (error) {
      displayMessage({
        type: "error",
        text: `Cannot update blog "${blog.title}"`,
      });
    }
  };

  return (
    <div style={blogStyle}>
      {blog.title} - {blog.author}
      <ToggleForm
        showButtonLabel="view"
        hideButtonLabel="hide"
        visible={visible}
        toggleVisibility={() => setVisible(!visible)}
      >
        {blog.url} <br />
        likes {likes} <button onClick={addLike}>like</button>
        <br />
        {blog.user.name} <br />
      </ToggleForm>
    </div>
  );
};

export default Blog;
