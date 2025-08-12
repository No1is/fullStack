import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { initializeBlogs } from "./reducers/blogReducer";
import { setUser, logout } from "./reducers/userReducer";
import { setNotification } from "./reducers/messageReducer";
import BlogList from "./components/BlogList";
import LoginForm from "./components/LoginForm";
import blogService from "./services/blogs";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import Logout from "./components/Logout";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  useEffect(() => {
    const loggedUser = window.localStorage.getItem("loggedInUser");

    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      dispatch(setUser(user));
      blogService.setToken(user.token);
    }
  }, [dispatch]);

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
