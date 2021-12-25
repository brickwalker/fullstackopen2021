import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { initializeBlogs } from "../reducers/blogReducer";
import { addLike, deleteBlog, addComment } from "../reducers/blogReducer";
import { showNotification } from "../reducers/messageReducer";

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
      <div>
        <h2>
          {blog.title} - {blog.author}
        </h2>
        <p>
          <strong>url</strong> {blog.url}
        </p>
        <p>
          <strong>likes</strong> {blog.likes}{" "}
          <button onClick={handleLike}>like</button>
        </p>
        <p>
          <strong>added by</strong> {blog.user.name}
        </p>
        <button onClick={handleDelete}>delete</button>
        <h3>comments</h3>
        <form onSubmit={handleComment}>
          <input id="commentField" required />
          <button type="submit">add comment</button>
        </form>
        <ul>
          {blog.comments.length > 0 ? (
            blog.comments.map((el) => <li key={el}>{el}</li>)
          ) : (
            <p>No comments</p>
          )}
        </ul>
      </div>
    );
  }
  return null;
};

export default BlogView;
