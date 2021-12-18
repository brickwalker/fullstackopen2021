import React, { useState } from "react";
import ToggleForm from "./ToggleForm";
import blogService from "../services/blogs";

const Blog = ({ blog, setBlogs, displayMessage }) => {
  const [visible, setVisible] = useState(false);
  const [likes, setLikes] = useState(blog.likes);
  const [deleted, setDeleted] = useState(false);

  const blogStyle = {
    borderStyle: "solid",
    borderWidth: 1,
    margin: 5,
    padding: 5,
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
      setLikes(likes + 1);
    } catch (error) {
      displayMessage({
        type: "error",
        text: `Cannot update blog "${blog.title}"`,
      });
    }
  };

  const isBlogOwner = () => {
    const user = JSON.parse(localStorage.getItem("bloglistUser"));
    if (user.username === blog.user.username) {
      return true;
    } else {
      return false;
    }
  };

  const deleteBlog = async () => {
    const remove = window.confirm(`Are you sure you want to remove this blog?
${blog.title} by ${blog.author}`);
    const id = blog.id;
    if (remove) {
      try {
        await blogService.deleteBlog(id);
        setDeleted(true);
        displayMessage({
          type: "info",
          text: `Blog "${blog.title}" removed`,
        });
      } catch (error) {
        displayMessage({
          type: "error",
          text: `Cannot remove blog "${blog.title}"`,
        });
      }
    }
  };

  if (deleted) {
    return null;
  } 

  return (
    <div style={blogStyle}>
      {blog.title} - {blog.author}
      <ToggleForm
        showButtonLabel="view"
        hideButtonLabel="hide"
        visible={visible}
        toggleVisibility={() => setVisible(!visible)}
      >
        {isBlogOwner() && (
          <div>
            <button style={{ backgroundColor: "orange" }} onClick={deleteBlog}>
              delete
            </button>
          </div>
        )}
        {blog.url} <br />
        likes {likes} <button onClick={addLike}>like</button>
        <br />
        {blog.user.name} <br />
      </ToggleForm>
    </div>
  );
};

export default Blog;
