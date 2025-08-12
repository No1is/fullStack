import { createSlice, current } from '@reduxjs/toolkit'

const initialState = null

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    displayMessage(state, action) {
      return action.payload
    },
    clearMessage(state,action) {
      return null
    }
  }
})

export const { displayMessage, clearMessage } = messageSlice.actions

export const setNotification = (text, timeout) => {
  return dispatch => {
    dispatch(displayMessage(text))

    setTimeout(() => {
      dispatch(clearMessage())
    }, timeout)
  }
}
export default messageSlice.reducer