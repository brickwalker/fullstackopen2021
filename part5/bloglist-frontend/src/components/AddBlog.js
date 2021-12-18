import React, { useState } from "react";
import blogService from "../services/blogs";

const AddBlog = ({ setBlogs, displayMessage, toggleVisibility }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await blogService.addBlog({ title, author, url });
      const blogs = await blogService.getAll();
      toggleVisibility();
      displayMessage({
        type: "info",
        text: `"${title}" is added`,
      });
      setBlogs(blogs);
      setTitle("");
      setAuthor("");
      setUrl("");
    } catch (error) {
      console.error(error);
      displayMessage({
        type: "error",
        text: `"${title}" cannot be added`,
      });
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

export default AddBlog;

