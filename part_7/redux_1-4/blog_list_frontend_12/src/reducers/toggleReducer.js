import { createSlice } from "@reduxjs/toolkit";

const toggleSlice = createSlice({
  name: "visible",
  initialState: false,
  reducers: {
    toggleView(state) {
      return !state;
    },
  },
});

export const { toggleView } = toggleSlice.actions;
export default toggleSlice.reducer;
