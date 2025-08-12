import React from "react";
import { useUserDispatch, useUserValue } from "./contexts/UserContext";
import { useEffect } from "react";
import BlogList from "./components/BlogList";
import LoginForm from "./components/LoginForm";
import blogService from "./services/blogs";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import Logout from "./components/Logout";
import Users from './components/Users'
import User from './components/User'
import { Routes, Route, useMatch } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query' 

const App = () => {
  const dispatch = useUserDispatch();
  const user = useUserValue()?.user;
  const { data: blogs, isLoading, isError } = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll
  })

  useEffect(() => {
    const loggedUser = window.localStorage.getItem("loggedInUser");

    if (loggedUser) {
      const storedUser = JSON.parse(loggedUser);
      dispatch({ type: "SET", payload: storedUser });
      blogService.setToken(storedUser.token);
    }
  }, []);

  const match = useMatch('/users/:id')

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error loading blogs...</div>

  const userPage = match && blogs
    ? blogs.find(blog => blog.user.id === match.params.id)?.user?.id ?? null
    : null

  return (
    <div>
      <Routes>
        <Route 
          path='/'
          element={
            (
              !user ? (
                <LoginForm />
              ) : (
                <div>
                  <h2>blogs</h2>
                  <Notification />
                  <Logout />
                  <Togglable />
                  <BlogList />
                </div>
              )
            )
          } 
        />
        <Route path='/users' element={
            <div>
              <h2>blogs</h2>
              <Notification />
              <Logout />
              <Users />
            </div>
          } 
        />
        <Route path='/users/:id' element={
            <div>
              <h2>blogs</h2>
              <Notification />
              <Logout />
              <User userId={userPage} />
            </div>
          } 
        />
      </Routes>
    </div>
  );
};

export default App;
