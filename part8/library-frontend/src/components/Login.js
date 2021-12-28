import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../queries";

const Login = ({ show, setPage, setUser }) => {
  const [error, setError] = useState(null);
  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      console.error(error);
      setError(error.toString());
    },
  });

  useEffect(() => {
    if (result.data) {
      const userName = document.getElementById("login-name").value;
      const tokenValue = result.data.login.value;
      const bearerToken = `Bearer ${tokenValue}`;
      localStorage.setItem("libraryUserName", userName);
      localStorage.setItem("libraryUserToken", bearerToken);
      setPage("authors");
      setUser(userName);
    }
  }, [result.data, setPage, setUser]);

  const handleLogin = (event) => {
    event.preventDefault();
    setError(null);
    const username = document.getElementById("login-name").value;
    const password = document.getElementById("login-password").value;
    login({ variables: { username, password } });
  };

  if (!show) {
    return null;
  }
  return (
    <div>
      <form onSubmit={handleLogin}>
        <label>
          name <input id="login-name" required />
        </label>
        <br />
        <label>
          password <input id="login-password" type="password" required />
        </label>
        <br />
        <button type="submit">login</button>
      </form>
      {error && <p style={{ backgroundColor: "red" }}>{error}</p>}
    </div>
  );
};

export default Login;
