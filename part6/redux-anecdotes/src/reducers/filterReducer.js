const reducer = (state = "", action) => {
  switch (action.type) {
    case "FILTER":
      return action.data.filter;
    default:
      return state;
  }
};

export const updateFilter = (text) => {
  return {
    type: "FILTER",
    data: { filter: text },
  };
};

export default reducer;
