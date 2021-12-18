import React, { useState, useEffect } from "react";
import BlogList from "./components/BlogList";
import Login from "./components/Login";
import loginService from "./services/login";
import "./App.css";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const bloglistUserString = localStorage.getItem("bloglistUser");
    if (bloglistUserString) {
      const user = JSON.parse(bloglistUserString);
      setUser(user);
    }
  }, []);

  const displayMessage = (messageObj) => {
    setMessage(messageObj);
    setTimeout(() => setMessage(null), 3000);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      setUser(user);
      localStorage.setItem("bloglistUser", JSON.stringify(user));
      displayMessage({
        type: "info",
        text: `Welcome ${user.name}`,
      });
      setUsername("");
      setPassword("");
    } catch (exception) {
      displayMessage({
        type: "error",
        text: "Login unsuccessful - check your username and password",
      });
      console.error("Cannot login exception: ", exception);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("bloglistUser");
    displayMessage({
      type: "info",
      text: `Goodbye ${user.name}`,
    });
    setUser(null);
  };

  return (
    <div>
      {message !== null && <div className={message.type}>{message.text}</div>}

      {user === null ? (
        <Login
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          onSubmit={handleLogin}
        />
      ) : (
        <BlogList
          user={user.name}
          handleLogout={handleLogout}
          displayMessage={displayMessage}
        />
      )}
    </div>
  );
};

export default App;
