import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { likeAnecdote, loadAnecdotes } from "../reducers/anecdoteReducer";
import { displayMessage } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadAnecdotes());
  }, [dispatch]);

  const anecdotes = useSelector((state) =>
    state.anecdotes.filter((anecdote) =>
      anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
    )
  );

  const vote = (anecdote) => {
    dispatch(likeAnecdote(anecdote));
    dispatch(displayMessage(`You voted '${anecdote.content}'`, 5000));
  };

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
