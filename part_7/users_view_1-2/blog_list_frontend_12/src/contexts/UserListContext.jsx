import { createContext, useContext, useReducer } from 'react'
import userService from '../services/users'

const initialState = []

const userListReducer = (state, action) => {
    switch (action.type) {
        case 'GET_LIST':
            return action.payload
        default:
            return state
    }
}

const UserListContext = createContext()

export const UserListContextProvider = (props) => {
    const [userList, userListDispatch] = useReducer(userListReducer, initialState)

    const setUserList = async () => {
        const response = await userService.getAll()
        userListDispatch({ type: 'GET_LIST', payload: response})
    }

    return (
        <UserListContext.Provider value={{ userList, setUserList }}>
            {props.children}
        </UserListContext.Provider>
    )
}

export const useUserListValue = () => {
    const { userList } = useContext(UserListContext)
    return userList
}

export const useUserListDispatch = () => {
    const { setUserList } = useContext(UserListContext)
    return setUserList
}

export default UserListContext