import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";

const Books = (props) => {
  const [genre, setGenre] = useState("all");
  const response = useQuery(ALL_BOOKS);

  if (!props.show) {
    return null;
  }

  if (response.loading) {
    return <div>loading...</div>;
  }

  let books = response.data.allBooks;
  const uniqueGenres = [];
  books.forEach((book) =>
    book.genres.forEach((genre) => {
      if (!uniqueGenres.includes(genre)) {
        uniqueGenres.push(genre);
      }
    })
  );
  uniqueGenres.sort();
  if (genre !== "all") {
    books = books.filter((book) => book.genres.includes(genre));
  }

  return (
    <div>
      <h2>books</h2>
      <div>
        <button onClick={() => setGenre("all")}>all</button>
        {uniqueGenres.map((genre) => (
          <button key={genre} onClick={() => setGenre(genre)}>
            {genre}
          </button>
        ))}
      </div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Books;
