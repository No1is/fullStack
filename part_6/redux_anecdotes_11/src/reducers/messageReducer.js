import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        displayMessage(state, action) {
            return action.payload
        }
    }
})

export const { displayMessage } = messageSlice.actions
export default messageSlice.reducer