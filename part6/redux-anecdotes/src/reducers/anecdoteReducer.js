import anecdoteService from "../services/anecdote";

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

export const addAnecdote = (object) => {
  return {
    type: "ADD",
    data: object,
  };
};

export const loadAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({
      type: "LOAD_AC",
      data: anecdotes,
    });
  };
};

export default reducer;
