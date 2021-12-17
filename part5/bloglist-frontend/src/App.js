import React, { useState, useEffect } from "react";
import BlogList from "./components/BlogList";
import Login from "./components/Login";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      setUser(user);
      console.log("THIS IS USER", user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      console.error("Cannot login exception: ", exception);
    }
  };

  return (
    <div>
      {user === null ? (
        <Login
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          onSubmit={handleLogin}
        />
      ) : (
        <BlogList user={user.name} blogs={blogs} />
      )}
    </div>
  );
};

export default App;
