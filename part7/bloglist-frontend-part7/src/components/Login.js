import React from "react";
import propTypes from "prop-types";
import { Box, TextField, Typography, Button } from "@mui/material";

const Login = (props) => {
  return (
    <Box component="div" m={5}>
      <Typography variant="h2">login</Typography>
      <Box component="form" onSubmit={props.onSubmit}>
        <TextField
          label="Username"
          type="text"
          value={props.username}
          required
          onChange={({ target }) => props.setUsername(target.value)}
        />
        <br />
        <TextField
          label="Password"
          type="password"
          value={props.password}
          required
          onChange={({ target }) => props.setPassword(target.value)}
        />
        <br />
        <Button type="submit" variant="outlined">login</Button>
      </Box>
    </Box>
  );
};

Login.propTypes = {
  username: propTypes.string.isRequired,
  setUsername: propTypes.func.isRequired,
  password: propTypes.string.isRequired,
  setPassword: propTypes.func.isRequired,
  onSubmit: propTypes.func.isRequired,
};

export default Login;
