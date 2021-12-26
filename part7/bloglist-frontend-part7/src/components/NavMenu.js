import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { logoutUser } from "../reducers/loginReducer";
import { showNotification } from "../reducers/messageReducer";
import { AppBar, Toolbar, Button, Typography } from "@mui/material";

const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
`;

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
    <AppBar position="static">
      <Toolbar>
        <StyledLink to="/">
          <Button variant="string">blogs</Button>
        </StyledLink>{" "}
        <StyledLink to="/users">
          <Button variant="string">users</Button>
        </StyledLink>{" "}
        <Typography variant="caption">{user.name} is logged in </Typography>
        <Button variant="string" onClick={handleLogout}>
          logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavMenu;
