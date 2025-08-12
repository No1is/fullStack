import { configureStore } from "@reduxjs/toolkit";
import blogReducer from "./reducers/blogReducer";
import blogFormReducer from "./reducers/blogFormReducer";
import messageReducer from "./reducers/messageReducer";
import userReducer from "./reducers/userReducer";
import toggleReducer from "./reducers/toggleReducer";
import userListReducer from './reducers/usersListReducer'
import commentFormReducer from './reducers/commentFormReducer'

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    newBlog: blogFormReducer,
    user: userReducer,
    message: messageReducer,
    visible: toggleReducer,
    userList: userListReducer,
    comment: commentFormReducer,
  },
});

export default store;
