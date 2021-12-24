import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import BlogList from "./components/BlogList";
import Login from "./components/Login";
import DisplayMessage from "./components/DisplayMessage";
import loginService from "./services/login";
import { showNotification } from "./reducers/messageReducer";
import "./App.css";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const bloglistUserString = localStorage.getItem("bloglistUser");
    if (bloglistUserString) {
      const user = JSON.parse(bloglistUserString);
      setUser(user);
    }
  }, []);

  const message = useSelector((state) => state.message);
  const dispatch = useDispatch();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      setUser(user);
      localStorage.setItem("bloglistUser", JSON.stringify(user));
      dispatch(
        showNotification({
          type: "info",
          text: `Welcome ${user.name}`,
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

  const handleLogout = () => {
    localStorage.removeItem("bloglistUser");
    dispatch(
      showNotification({
        type: "info",
        text: `Goodbye ${user.name}`,
      })
    );
    setUser(null);
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
        <BlogList user={user.name} handleLogout={handleLogout} />
      )}
    </div>
  );
};

export default App;
