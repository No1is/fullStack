import { createSlice } from "@reduxjs/toolkit";

const toggleSlice = createSlice({
  name: "visible",
  initialState: false,
  reducers: {
    toggleView(state) {
      return !state;
    },
    resetView() {
      return false
    }
  },
});

export const { toggleView, resetView } = toggleSlice.actions;
export default toggleSlice.reducer;
