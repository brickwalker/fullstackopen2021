const initialState = null;

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "NOTIFY":
      return action.data.message;
    case "HIDE":
      return null;
    default:
      return initialState;
  }
};

export const displayMessage = (message) => {
  return {
    type: "NOTIFY",
    data: { message },
  };
};

export const hideMessage = () => {
  return {
    type: "HIDE",
    data: { message: null },
  };
};

export default reducer;
