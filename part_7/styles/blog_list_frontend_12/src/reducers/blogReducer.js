import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    like(state, action) {
      const id = action.payload;
      const blogChange = state.find((b) => b.id === id);
      const changedBlog = { ...blogChange, likes: blogChange.likes + 1 };
      return state.map((blog) => (blog.id !== id ? blog : changedBlog));
    },
    setBlogs(state, action) {
      return action.payload;
    },
    appendBlog(state, action) {
      state.push(action.payload);
    },
    deleteBlog(state, action) {
      const id = action.payload;
      return state.filter((blog) => blog.id !== id);
    },
  },
});

export const { like, setBlogs, appendBlog, deleteBlog } = blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = (content, user) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(content);
    newBlog.user = {
      username: user.username,
      name: user.name,
      id: user.id,
    };
    dispatch(appendBlog(newBlog));
  };
};

export const likeBlog = (blog, newLikes) => {
  return async (dispatch) => {
    await blogService.update(blog, newLikes);
    dispatch(like(blog.id));
  };
};

export const removeBlog = (blog) => {
  return async (dispatch) => {
    await blogService.remove(blog);
    dispatch(deleteBlog(blog.id));
  };
};

export default blogSlice.reducer;
