import React from "react";
import { useQuery } from "@apollo/client";
import { ALL_BOOKS, CURRENT_USER } from "../queries";

const Recommended = (props) => {
  const bookResponse = useQuery(ALL_BOOKS);
  const userResponse = useQuery(CURRENT_USER);

  if (!props.show) {
    return null;
  }

  if (bookResponse.loading || userResponse.loading) {
    return <div>loading...</div>;
  }

  const favBooks = bookResponse.data.allBooks.filter((book) =>
    book.genres.includes(userResponse.data.me.favoriteGenre)
  );

  return (
    <div>
      <h2>recommendations</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {favBooks.map((a) => (
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

export default Recommended;
