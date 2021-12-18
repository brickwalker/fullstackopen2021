import React, { useState } from "react";
import Blog from "./Blog";
import AddBlog from "./AddBlog";
import ToggleForm from "./ToggleForm";

const BlogList = ({ user, blogs, handleLogout, setBlogs, displayMessage }) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => setVisible(!visible);

  return (
    <div>
      <h1>blogs</h1>
      <p>
        {user} is logged in <button onClick={handleLogout}>logout</button>
      </p>
      <ToggleForm
        buttonLabel="create new blog"
        visible={visible}
        toggleVisibility={toggleVisibility}
      >
        <AddBlog
          setBlogs={setBlogs}
          displayMessage={displayMessage}
          toggleVisibility={toggleVisibility}
        />
      </ToggleForm>
      <h2>list blogs</h2>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default BlogList;
