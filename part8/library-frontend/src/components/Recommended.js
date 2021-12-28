import React, { useEffect } from "react";
import { useLazyQuery, useQuery } from "@apollo/client";
import { CURRENT_USER, RECOMMENDED_BOOKS } from "../queries";

const Recommended = (props) => {
  const user = useQuery(CURRENT_USER);
  const [getRecommended, recommendation] = useLazyQuery(RECOMMENDED_BOOKS);

  useEffect(() => {
    if (user.data) {
      getRecommended({variables: {genre: user.data.me.favoriteGenre}})
    }
  }, [user.data, getRecommended])

  if (!props.show) {
    return null;
  }

  if (user.loading || recommendation.loading) {
    return <div>loading...</div>;
  }

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
          {recommendation.data && recommendation.data.allBooks.map((a) => (
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
