import loginService from "../services/login";

const loginReducer = (state = null, action) => {
  switch (action.type) {
    case "INIT_USER":
      return action.data;
    case "LOGIN_USER":
      return action.data;
    case "LOGOUT_USER":
      return null;
    default:
      return state;
  }
};

export const initUser = () => {
  return async (dispatch) => {
    const bloglistUserString = localStorage.getItem("bloglistUser");
    if (bloglistUserString) {
      const user = JSON.parse(bloglistUserString);
      dispatch({ type: "INIT_USER", data: user });
    }
  };
};

export const loginUser = (username, password) => {
  return async (dispatch) => {
    const user = await loginService.login({ username, password });
    localStorage.setItem("bloglistUser", JSON.stringify(user));
    dispatch({ type: "LOGIN_USER", data: user });
  };
};

export const logoutUser = () => {
  return async (dispatch) => {
    localStorage.removeItem("bloglistUser");
    dispatch({ type: "LOGOUT_USER" });
  };
};

export default loginReducer;
