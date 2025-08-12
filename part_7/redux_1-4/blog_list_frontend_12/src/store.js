import { configureStore } from "@reduxjs/toolkit";
import blogReducer from "./reducers/blogReducer";
import blogFormReducer from "./reducers/blogFormReducer";
import messageReducer from "./reducers/messageReducer";
import userReducer from "./reducers/userReducer";
import viewReducer from "./reducers/viewReducer";
import toggleReducer from "./reducers/toggleReducer";

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    newBlog: blogFormReducer,
    user: userReducer,
    message: messageReducer,
    showBlog: viewReducer,
    visible: toggleReducer,
  },
});

export default store;
