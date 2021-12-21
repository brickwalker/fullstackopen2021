import React from "react";
import { useDispatch } from "react-redux";
import { addAnecdote } from "../reducers/anecdoteReducer";
import { displayMessage, hideMessage } from "../reducers/notificationReducer";
import anecdoteService from "../services/anecdote";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const create = async (event) => {
    event.preventDefault();
    const anecdoteText = event.target.anecdoteInput.value;
    const anecdoteObject = await anecdoteService.postOne(anecdoteText);
    dispatch(addAnecdote(anecdoteObject));
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
