import anecdoteService from "../services/anecdote";

const sortByVotes = (array) => {
  const newArray = [...array];
  newArray.sort((firstEl, secondEl) => secondEl.votes - firstEl.votes);
  return newArray;
};

const reducer = (state = [], action) => {
  switch (action.type) {
    case "LIKE": {
      const updatedAnecdote = action.data;
      const newState = state.map((anecdote) =>
        anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote
      );
      return sortByVotes(newState);
    }
    case "ADD": {
      const newState = [...state, action.data];
      return newState;
    }
    case "LOAD_AC": {
      return sortByVotes(action.data);
    }

    default:
      return state;
  }
};

export const likeAnecdote = (anecdote) => {
  return async (dispatch) => {
    const patchedAnecdote = await anecdoteService.patchVote(anecdote);
    dispatch({
      type: "LIKE",
      data: patchedAnecdote,
    });
  };
};

export const addAnecdote = (anecdoteText) => {
  return async (dispatch) => {
    const anecdoteObject = await anecdoteService.postOne(anecdoteText);
    dispatch({
      type: "ADD",
      data: anecdoteObject,
    });
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
