import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/Users'

const userListSlice = createSlice({
    name: 'userList',
    initialState:[],
    reducers: {
        setUsersList(state, action) {
            return action.payload
        },
    } 
})

export const { setUsersList } = userListSlice.actions

export const initializeUsers = () => {
    return async (dispatch) => {
        const userList = await userService.getAll()
        dispatch(setUsersList(userList))
    }
} 

export default userListSlice.reducer