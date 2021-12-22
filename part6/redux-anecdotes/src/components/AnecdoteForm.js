import React from "react";
import { connect } from "react-redux";
import { addAnecdote } from "../reducers/anecdoteReducer";
import { displayMessage } from "../reducers/notificationReducer";

const AnecdoteForm = (props) => {
  const create = async (event) => {
    event.preventDefault();
    const anecdoteText = event.target.anecdoteInput.value;
    props.addAnecdote(anecdoteText);
    props.displayMessage(`You added '${anecdoteText}'`, 5000);
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

const mapDispatchToProps = {
  addAnecdote,
  displayMessage,
};

const ConnectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm);

export default ConnectedAnecdoteForm;
