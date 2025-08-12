import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { initializeBlogs } from "./reducers/blogReducer";
import { setUser } from "./reducers/userReducer";
import { initializeUsers } from './reducers/usersListReducer'
import Menu from './components/Menu'
import LoginForm from "./components/LoginForm";
import blogService from "./services/blogs";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import UserList from './components/UsersList'
import UserView from './components/UserView'
import BlogView from './components/BlogView'
import BlogList from './components/BlogList'
import { Routes, Route } from 'react-router-dom'

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

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  return (
    <div>
        {!user ? (
          <LoginForm />
        ) : (
          <div>
            <Menu />
            <h2>blog app</h2>
            <Notification />
            <Routes>
              <Route path={'/'} element={
                  <div>
                    <Togglable />
                    <BlogList />
                  </div>
                } 
              />
              <Route path={'/users'} element={<UserList />} />
              <Route path={'/users/:id'} element={<UserView />} />
              <Route path={'/blogs/:id'} element={<BlogView />} />
            </Routes>
          </div>
        )}
    </div>
  );
};

export default App;
