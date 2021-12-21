import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { likeAnecdote, loadAnecdotes } from "../reducers/anecdoteReducer";
import { displayMessage, hideMessage } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadAnecdotes());
  }, [dispatch]);

  const anecdotes = useSelector((state) =>
    state.anecdotes.filter((anecdote) =>
      anecdote.content.includes(state.filter)
    )
  );

  const vote = (anecdote) => {
    dispatch(likeAnecdote(anecdote.id));
    dispatch(displayMessage(`You voted '${anecdote.content}'`));
    setTimeout(() => dispatch(hideMessage()), 5000);
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
