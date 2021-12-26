import React, { useState } from "react";
import propTypes from "prop-types";
import { useDispatch } from "react-redux";
import { showNotification } from "../reducers/messageReducer";
import { addBlog } from "../reducers/blogReducer";
import { Typography, Box, TextField, Button } from "@mui/material";

const AddBlog = ({ toggleVisibility }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      dispatch(addBlog(title, author, url));
      dispatch(
        showNotification({
          type: "info",
          text: `"${title}" is added`,
        })
      );
      toggleVisibility();
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
    <Box component="div" mt={2}>
      <Typography variant="h4">Create new</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          type="text"
          required
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
        <br />
        <TextField
          label="Author"
          type="text"
          required
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
        <br />
        <TextField
          label="URL"
          type="url"
          required
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
        <br />
        <Button type="submit" variant="contained">add</Button>
      </form>
    </Box>
  );
};

AddBlog.propTypes = {
  toggleVisibility: propTypes.func.isRequired,
};

export default AddBlog;
