const reducer = (state = null, action) => {
  switch (action.type) {
    case "NOTIFY":
      return action.data.message;
    case "HIDE":
      return null;
    default:
      return state;
  }
};

let timeoutId;

export const displayMessage = (message, timeMs) => {
  return async (dispatch) => {
    dispatch({
      type: "NOTIFY",
      data: { message },
    });
    clearTimeout(timeoutId);
    timeoutId = setTimeout(
      () =>
        dispatch({
          type: "HIDE",
          data: { message: null },
        }),
      timeMs
    );
  };
};

export default reducer;
