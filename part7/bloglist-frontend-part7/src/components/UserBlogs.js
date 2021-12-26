import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getUsers } from "../reducers/usersReducer";
import { Box, Typography, List, ListItem } from "@mui/material"

const UserBlogs = () => {
  const { id } = useParams();
  const user = useSelector((state) =>
    state.users.find((user) => user.id === id)
  );

  const dispatch = useDispatch();

  useEffect(() => dispatch(getUsers()), []);

  if (user) {
    return (
      <Box m={5}>
        <Typography variant="h3">{user.name}</Typography>
        <List>
          {user.blogs.map((blog) => (
            <ListItem key={blog.id}><Typography>{blog.title}</Typography></ListItem>
          ))}
        </List>
      </Box>
    );
  }

  return null;
};

export default UserBlogs;
