import React from 'react';

const Login = (props) => {

  return (
    <div>
      <h1>login</h1>
      <form onSubmit={props.onSubmit}>
        <label>
          username{" "}
          <input
            id="username"
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
            id="password"
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

export default Login;
