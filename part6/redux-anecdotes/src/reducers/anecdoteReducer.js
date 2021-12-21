const asObject = (anecdote) => {
  return {
    content: anecdote,
    votes: 0,
  };
};

const reducer = (state = [], action) => {
  switch (action.type) {
    case "LIKE": {
      const anecdote = state.find((anecdote) => anecdote.id === action.data.id);
      const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 };
      const newState = state.map((anecdote) =>
        anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote
      );
      newState.sort((firstEl, secondEl) => secondEl.votes - firstEl.votes);
      return newState;
    }
    case "ADD": {
      const newState = [...state, action.data];
      return newState;
    }
    case "LOAD_AC":
      return action.data;
    default:
      return state;
  }
};

export const likeAnecdote = (id) => {
  return {
    type: "LIKE",
    data: { id },
  };
};

export const addAnecdote = (text) => {
  return {
    type: "ADD",
    data: asObject(text),
  };
};

export const loadAnecdotes = (data) => {
  return {
    type: "LOAD_AC",
    data,
  };
};

export default reducer;
