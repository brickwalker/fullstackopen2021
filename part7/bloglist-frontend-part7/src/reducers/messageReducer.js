const messageReducer = (state = null, action) => {
  switch (action.type) {
    case "SHOW_MESSAGE":
      return action.data;

    case "HIDE_MESSAGE":
      return null;

    default:
      return state;
  }
};

export const showNotification = (message) => {
  return async (dispatch) => {
    dispatch({
      type: "SHOW_MESSAGE",
      data: message,
    });
    setTimeout(() => dispatch({ type: "HIDE_MESSAGE" }), 3000);
  };
};

export default messageReducer;
