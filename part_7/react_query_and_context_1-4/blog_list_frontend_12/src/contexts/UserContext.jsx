import { createContext, useReducer, useContext } from "react";
import loginService from "../services/login";
import blogService from "../services/blogs";

const initialState = {
  username: "",
  password: "",
  user: null,
};

const userReducer = (state, action) => {
  switch (action.type) {
    case "USERNAME":
      return { ...state, username: action.payload };
    case "PASSWORD":
      return { ...state, password: action.payload };
    case "SET":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return initialState;
    case "CLEAR":
      return { ...state, username: "", password: "" };
    default:
      return state;
  }
};

const UserContext = createContext();

export const UserContextProvider = (props) => {
  const [user, userDispatch] = useReducer(userReducer, initialState);

  const loginUser = async (username, password) => {
    try {
      const user = await loginService.login({ username, password });
      userDispatch({
        type: "SET",
        payload: user,
      });
      window.localStorage.setItem("loggedInUser", JSON.stringify(user));
      blogService.setToken(user.token);
      return user;
    } catch (error) {
      return null;
    }
  };

  const logOutUser = () => {
    window.localStorage.removeItem("loggedInUser");
    blogService.setToken(null);
    userDispatch({ type: "LOGOUT" });
  };

  return (
    <UserContext.Provider value={{ user, userDispatch, loginUser, logOutUser }}>
      {props.children}
    </UserContext.Provider>
  );
};

export const useUserValue = () => {
  const { user } = useContext(UserContext);
  return user;
};

export const useUserDispatch = () => {
  const { userDispatch } = useContext(UserContext);
  return userDispatch;
};

export default UserContext;
