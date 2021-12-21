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

export const displayMessage = (message, timeMs) => {
  return async (dispatch) => {
    dispatch({
      type: "NOTIFY",
      data: { message },
    });
    setTimeout(
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
