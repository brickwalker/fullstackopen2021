import React from "react";
import { useDispatch } from "react-redux";
import { addAnecdote } from "../reducers/anecdoteReducer";
import { displayMessage } from "../reducers/notificationReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const create = async (event) => {
    event.preventDefault();
    const anecdoteText = event.target.anecdoteInput.value;
    dispatch(addAnecdote(anecdoteText));
    dispatch(displayMessage(`You added '${anecdoteText}'`, 5000));
    event.target.anecdoteInput.value = "";
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={create}>
        <div>
          <input name="anecdoteInput" />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
