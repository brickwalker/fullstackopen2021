import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "../reducers/loginReducer";
import { showNotification } from "../reducers/messageReducer";

const NavMenu = () => {
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
      <Link to="/">blogs</Link> {" "}
      <Link to="/users">users</Link> {" "}
      <span>
        {user.name} is logged in <button onClick={handleLogout}>logout</button>
      </span>
    </div>
  );
};

export default NavMenu;
