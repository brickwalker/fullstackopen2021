import React, { useState } from "react";
import propTypes from "prop-types";
import { useDispatch } from "react-redux";
import { showNotification } from "../reducers/messageReducer";
import blogService from "../services/blogs";

const AddBlog = ({ setBlogs, toggleVisibility }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await blogService.addBlog({ title, author, url });
      const blogs = await blogService.getAll();
      toggleVisibility();
      dispatch(
        showNotification({
          type: "info",
          text: `"${title}" is added`,
        })
      );
      setBlogs(blogs);
      setTitle("");
      setAuthor("");
      setUrl("");
    } catch (error) {
      console.error(error);
      dispatch(
        showNotification({
          type: "error",
          text: `"${title}" cannot be added`,
        })
      );
    }
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <label>
          title{" "}
          <input
            type="text"
            required
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </label>
        <br />
        <label>
          author{" "}
          <input
            type="text"
            required
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </label>
        <br />
        <label>
          url{" "}
          <input
            type="url"
            required
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </label>
        <br />
        <button type="submit">add</button>
      </form>
    </div>
  );
};

AddBlog.propTypes = {
  setBlogs: propTypes.func.isRequired,
  toggleVisibility: propTypes.func.isRequired,
};

export default AddBlog;
