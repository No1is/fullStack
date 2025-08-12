import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const viewSlice = createSlice({
  name: "showBlog",
  initialState,
  reducers: {
    setVisibility(state, action) {
      const { id, visible } = action.payload;
      state[id] = visible;
    },
    toggleView(state, action) {
      const id = action.payload;
      state[id] = !state[id];
    },
    resetView() {
      return {};
    },
  },
});

export const { toggleView, setVisibility, resetView } = viewSlice.actions;
export default viewSlice.reducer;
