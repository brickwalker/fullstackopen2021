import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../reducers/loginReducer";
import { showNotification } from "../reducers/messageReducer";

const BlogIndex = () => {
  const user = useSelector((state) => state.login);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
    dispatch(
      showNotification({
        type: "info",
        text: `Goodbye ${user.name}`,
      })
    );
  };

  return (
    <div>
      <h1>blogs</h1>
      <p>
        {user.name} is logged in <button onClick={handleLogout}>logout</button>
      </p>
    </div>
  );
};

export default BlogIndex;
