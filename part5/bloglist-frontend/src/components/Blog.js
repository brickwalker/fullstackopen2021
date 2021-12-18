import React, { useState } from "react";
import ToggleForm from "./ToggleForm";

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState();

  const blogStyle = {
    borderStyle: "solid",
    borderWidth: 1,
    margin: 1,
    padding: 1
  }

  return (
    <div style={blogStyle}>
      {blog.title} - {blog.author}
      <ToggleForm
        showButtonLabel="view"
        hideButtonLabel="hide"
        visible={visible}
        toggleVisibility={() => setVisible(!visible)}
      >
        {blog.url} <br />
        likes {blog.likes} <button>like</button><br />
        {blog.user.name} <br />
      </ToggleForm>
    </div>
  );
};

export default Blog;
