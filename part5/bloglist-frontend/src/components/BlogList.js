import React from "react";
import Blog from "./Blog";
import AddBlog from "./AddBlog";

const BlogList = ({ user, blogs, handleLogout, setBlogs, displayMessage }) => {
  return (
    <div>
      <h1>blogs</h1>
      <p>
        {user} is logged in <button onClick={handleLogout}>logout</button>
      </p>
      <AddBlog setBlogs={setBlogs} displayMessage={displayMessage} />
      <h2>list blogs</h2>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default BlogList;
