import React from "react";
import propTypes from "prop-types";
import { Link } from "react-router-dom";

const BlogItem = ({ blog }) => {
  const blogStyle = {
    borderStyle: "solid",
    borderWidth: 1,
    margin: 5,
    padding: 5,
  };

  return (
    <div style={blogStyle}>
      <Link to={`/blogs/${blog.id}`}>
        {blog.title} - {blog.author}
      </Link>
    </div>
  );
};

BlogItem.propTypes = {
  blog: propTypes.object.isRequired,
};

export default BlogItem;
