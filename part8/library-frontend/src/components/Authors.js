import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import { ALL_AUTHORS, EDIT_BIRTH_YEAR } from "../queries";

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS);
  const [editBirthYear] = useMutation(EDIT_BIRTH_YEAR, {
    refetchQueries: ALL_AUTHORS,
  });

  const handleAuthorYear = (event) => {
    event.preventDefault();
    const name = document.getElementById("by-author-name").value;
    const year = parseInt(document.getElementById("by-year").value);
    editBirthYear({ variables: { name, setBornTo: year } });
    document.getElementById("by-year").value = "";
  };

  if (!props.show) {
    return null;
  }

  if (result.loading) {
    return <div>loading...</div>;
  }

  const authors = result.data.allAuthors;

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Set birthyear</h3>
      <form onSubmit={handleAuthorYear}>
        <select id="by-author-name">
          {authors.map((author) => (
            <option key={author.id} value={author.name}>
              {author.name}
            </option>
          ))}
        </select>
        <br />
        <label>
          Year <input id="by-year" type="number" required />
        </label>
        <br />
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default Authors;
