import React from "react";
import { useUserDispatch, useUserValue } from "./contexts/UserContext";
import { useEffect } from "react";
import BlogList from "./components/BlogList";
import LoginForm from "./components/LoginForm";
import blogService from "./services/blogs";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import Logout from "./components/Logout";

const App = () => {
  const dispatch = useUserDispatch();
  const user = useUserValue()?.user;

  useEffect(() => {
    const loggedUser = window.localStorage.getItem("loggedInUser");

    if (loggedUser) {
      const storedUser = JSON.parse(loggedUser);
      dispatch({ type: "SET", payload: storedUser });
      blogService.setToken(storedUser.token);
    }
  }, []);

  return (
    <div>
      {!user ? (
        <LoginForm />
      ) : (
        <div>
          <h2>blogs</h2>
          <Notification />
          <Logout />
          <Togglable />
          <BlogList />
        </div>
      )}
    </div>
  );
};

export default App;
