import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { initializeBlogs } from "../reducers/blogReducer";
import { addLike, deleteBlog, addComment } from "../reducers/blogReducer";
import { showNotification } from "../reducers/messageReducer";
import { Typography, Box, Button, Input, List, ListItem } from "@mui/material";

const BlogView = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const blog = useSelector((state) =>
    state.blogs.find((blog) => blog.id === id)
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, []);

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

  const handleDelete = () => {
    const remove = window.confirm(`Are you sure you want to remove this blog?
${blog.title} by ${blog.author}`);
    if (remove) {
      try {
        dispatch(deleteBlog(blog.id));
        navigate("/");
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

  const handleComment = (event) => {
    event.preventDefault();
    const comment = document.getElementById("commentField").value;
    dispatch(addComment(blog.id, comment));
    document.getElementById("commentField").value = "";
  };

  if (blog) {
    return (
      <Box m={5}>
        <Typography variant="h3" mb={2}>
          {blog.title} - {blog.author}
        </Typography>
        <Typography>
          <strong>url</strong> {blog.url}
        </Typography>
        <Typography>
          <strong>likes</strong> {blog.likes}{" "}
          <Button onClick={handleLike}>like</Button>
        </Typography>
        <Typography>
          <strong>added by</strong> {blog.user.name}
        </Typography>
        <Button variant="contained" onClick={handleDelete}>
          delete
        </Button>
        <Typography variant="h4" mt={3}>Comments</Typography>
        <form onSubmit={handleComment}>
          <Input id="commentField" required />
          <Button type="submit">add comment</Button>
        </form>
        <List>
          {blog.comments.length > 0 ? (
            blog.comments.map((el) => <ListItem key={el}><Typography>{el}</Typography></ListItem>)
          ) : (
            <p>No comments</p>
          )}
        </List>
      </Box>
    );
  }
  return null;
};

export default BlogView;
