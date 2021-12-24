import userService from "../services/users";

const usersReducer = (state = [], action) => {
  switch (action.type) {
    case "LOAD_USERS":
      return action.data;
    default:
      return state;
  }
};

export const getUsers = () => {
  return async (dispatch) => {
    const users = await userService.getUsers();
    dispatch({
      type: "LOAD_USERS",
      data: users,
    });
  };
};

export default usersReducer;
