import React from "react";
import Blog from "./Blog";

const BlogList = ({ user, blogs }) => {
  return (
    <div>
      <h1>blogs</h1>
      <p>{user} is logged in</p>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default BlogList;
