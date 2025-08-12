import { createSlice } from '@reduxjs/toolkit'

const commentFormSlice = createSlice({
    name: 'comment',
    initialState: '',
    reducers: {
        setComment(state, action) {
            return action.payload
        },
        resetComment(state) {
            return ''
        }
    }
})

export const { setComment, resetComment } = commentFormSlice.actions

export default commentFormSlice.reducer