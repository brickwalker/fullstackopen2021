import React from "react";
import propTypes from "prop-types";

const Login = (props) => {
  return (
    <div>
      <h1>login</h1>
      <form onSubmit={props.onSubmit}>
        <label>
          username{" "}
          <input
            type="text"
            value={props.username}
            required
            onChange={({ target }) => props.setUsername(target.value)}
          />
        </label>
        <br />
        <label>
          password{" "}
          <input
            type="password"
            value={props.password}
            required
            onChange={({ target }) => props.setPassword(target.value)}
          />
        </label>
        <br />
        <button type="submit">login</button>
      </form>
    </div>
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
