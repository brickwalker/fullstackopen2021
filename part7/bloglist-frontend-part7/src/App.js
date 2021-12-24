import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import BlogList from "./components/BlogList";
import Login from "./components/Login";
import DisplayMessage from "./components/DisplayMessage";
import { showNotification } from "./reducers/messageReducer";
import { initUser, loginUser, logoutUser } from "./reducers/loginReducer";
import "./App.css";

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
