import React, { useState, useEffect } from "react";
import { useApolloClient, useSubscription } from "@apollo/client";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Login from "./components/Login";
import Recommended from "./components/Recommended";
import { ALL_AUTHORS, ALL_BOOKS, BOOK_ADDED } from "./queries";

const App = () => {
  const [page, setPage] = useState("authors");
  const [user, setUser] = useState(null);
  const client = useApolloClient();

  useEffect(() => {
    setUser(localStorage.getItem("libraryUserName"));
  }, []);

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded;
      window.alert(`${addedBook.title} added`);
      updateCacheWith(addedBook);
    },
  });

  const updateCacheWith = (addedBook) => {
    const inStore = (store, object, method) => {
      if (method === "byId") {
        return store.map((item) => item.id).includes(object.id);
      } else if (method === "byName") {
        return store.map((item) => item.name).includes(object.name);
      } else {
        return false;
      }
    };

    const booksInStore = client.readQuery({ query: ALL_BOOKS });
    if (!inStore(booksInStore.allBooks, addedBook, "byId")) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: booksInStore.allBooks.concat(addedBook) },
      });
    }
    const authorsInStore = client.readQuery({ query: ALL_AUTHORS });
    if (!inStore(authorsInStore.allAuthors, addedBook.author, "byName")) {
      client.writeQuery({
        query: ALL_AUTHORS,
        data: {
          allAuthors: authorsInStore.allAuthors.concat(addedBook.author),
        },
      });
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("libraryUserName");
    localStorage.removeItem("libraryUserToken");
    client.resetStore();
    setPage("authors");
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {user && <button onClick={() => setPage("add")}>add book</button>}
        {user && (
          <button onClick={() => setPage("recommended")}>recommended</button>
        )}
        {user ? (
          <button onClick={handleLogout}>{user} - logout</button>
        ) : (
          <button onClick={() => setPage("login")}>login</button>
        )}
      </div>

      <Authors show={page === "authors"} user={user} />

      <Books show={page === "books"} />

      <NewBook show={page === "add"} />

      <Recommended show={page === "recommended"} />

      <Login show={page === "login"} setPage={setPage} setUser={setUser} />
    </div>
  );
};

export default App;
