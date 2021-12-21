import React from "react";
import { useDispatch } from "react-redux";
import { addAnecdote } from "../reducers/anecdoteReducer";
import { displayMessage, hideMessage } from "../reducers/notificationReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const create = async (event) => {
    event.preventDefault();
    const anecdoteText = event.target.anecdoteInput.value;
    dispatch(addAnecdote(anecdoteText));
    dispatch(displayMessage(`You added '${anecdoteText}'`));
    event.target.anecdoteInput.value = "";
    setTimeout(() => dispatch(hideMessage()), 5000);
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
