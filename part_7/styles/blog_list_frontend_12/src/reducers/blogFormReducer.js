import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  title: "",
  author: "",
  url: "",
};

const blogFormSlice = createSlice({
  name: "newBlog",
  initialState,
  reducers: {
    updateForm(state, action) {
      const { name, value } = action.payload;
      state[name] = value;
    },
    clearForm() {
      return { title: "", author: "", url: "" };
    },
  },
});

export const { updateForm, clearForm } = blogFormSlice.actions;
export default blogFormSlice.reducer;
