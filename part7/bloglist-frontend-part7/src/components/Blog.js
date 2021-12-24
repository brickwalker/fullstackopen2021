import React, { useState } from "react";
import propTypes from "prop-types";
import { useDispatch } from "react-redux";
import { showNotification } from "../reducers/messageReducer";
import ToggleForm from "./ToggleForm";
import { addLike } from "../reducers/blogReducer";
import { deleteBlog } from "../reducers/blogReducer";

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false);

  const dispatch = useDispatch();

  const blogStyle = {
    borderStyle: "solid",
    borderWidth: 1,
    margin: 5,
    padding: 5,
  };

  const handleLike = () => {
    try {
      dispatch(addLike(blog));
    } catch (error) {
      dispatch(
        showNotification({
          type: "error",
          text: `Cannot update blog "${blog.title}"`,
        })
      );
    }
  };

  const isBlogOwner = () => {
    const user = JSON.parse(localStorage.getItem("bloglistUser"));
    if (user && user.username === blog.user.username) {
      return true;
    } else {
      return false;
    }
  };

  const handleDelete = async () => {
    const remove = window.confirm(`Are you sure you want to remove this blog?
${blog.title} by ${blog.author}`);
    if (remove) {
      try {
        dispatch(deleteBlog(blog.id));
        dispatch(
          showNotification({
            type: "info",
            text: `Blog "${blog.title}" removed`,
          })
        );
      } catch (error) {
        dispatch(
          showNotification({
            type: "error",
            text: `Cannot remove blog "${blog.title}"`,
          })
        );
      }
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
        {isBlogOwner() && (
          <div>
            <button
              style={{ backgroundColor: "orange" }}
              onClick={handleDelete}
            >
              delete
            </button>
          </div>
        )}
        {blog.url} <br />
        likes {blog.likes} <button onClick={handleLike}>like</button>
        <br />
        {blog.user.name} <br />
      </ToggleForm>
    </div>
  );
};

Blog.propTypes = {
  blog: propTypes.object.isRequired,
};

export default Blog;
