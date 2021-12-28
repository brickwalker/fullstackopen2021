import React, { useState, useEffect } from "react";
import { useApolloClient } from "@apollo/client";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Login from "./components/Login";

const App = () => {
  const [page, setPage] = useState("authors");
  const [user, setUser] = useState(null);
  const client = useApolloClient();

  useEffect(() => {
    setUser(localStorage.getItem("libraryUserName"));
  }, []);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("libraryUserName");
    localStorage.removeItem("libraryUserToken");
    client.resetStore();
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {user && <button onClick={() => setPage("add")}>add book</button>}
        {user ? (
          <button onClick={handleLogout}>{user} - logout</button>
        ) : (
          <button onClick={() => setPage("login")}>login</button>
        )}
      </div>

      <Authors show={page === "authors"} user={user} />

      <Books show={page === "books"} />

      <NewBook show={page === "add"} />

      <Login
        show={page === "login"}
        setPage={setPage}
        setUser={setUser}
      />
    </div>
  );
};

export default App;
