import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: null,
  error: null,
};

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setMessage(state, action) {
      state.message = action.payload.message;
      state.error = action.payload.error;
    },
    clearMessage(state) {
      state.message = null;
      state.error = null;
    },
  },
});

export const { setMessage, clearMessage } = messageSlice.actions;

export const setNotification = (message, error = null, timeout = 5000) => {
  return (dispatch) => {
    dispatch(setMessage({ message, error }));

    setTimeout(() => {
      dispatch(clearMessage());
    }, timeout);
  };
};

export default messageSlice.reducer;
