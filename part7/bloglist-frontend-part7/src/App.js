import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import BlogList from "./components/BlogList";
import Login from "./components/Login";
import DisplayMessage from "./components/DisplayMessage";
import { showNotification } from "./reducers/messageReducer";
import { initUser, loginUser } from "./reducers/loginReducer";
import "./App.css";
import BlogIndex from "./components/BlogIndex";
import Users from "./components/Users";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const message = useSelector((state) => state.message);
  const user = useSelector((state) => state.login);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initUser());
  }, []);

  const handleLogin = (event) => {
    event.preventDefault();
    try {
      dispatch(loginUser(username, password));
      dispatch(
        showNotification({
          type: "info",
          text: `Welcome ${username}`,
        })
      );
      setUsername("");
      setPassword("");
    } catch (exception) {
      dispatch(
        showNotification({
          type: "error",
          text: "Login unsuccessful - check your username and password",
        })
      );
      console.error("Cannot login exception: ", exception);
    }
  };

  return (
    <div>
      {message !== null && <DisplayMessage message={message} />}

      {user === null ? (
        <Login
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          onSubmit={handleLogin}
        />
      ) : (
        <div>
          <BlogIndex />
          <Routes>
            <Route path="/" element={<BlogList />} />
            <Route path="/users" element={<Users />} />
          </Routes>
        </div>
      )}
    </div>
  );
};

export default App;
