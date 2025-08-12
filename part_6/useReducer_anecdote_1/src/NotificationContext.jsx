import { createContext, useReducer, useContext } from "react"

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'MSG':
      return action.payload
    case 'CLEAR':
      return null
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
    const [message, messageDispatch] = useReducer(notificationReducer, null)

    return (
        <NotificationContext.Provider value={ [message, messageDispatch] } >
            {props.children}
        </NotificationContext.Provider> 
    )
}

export const useMessageValue = () => {
  const messageAndDispatch = useContext(NotificationContext)
  return messageAndDispatch[0]
}
export const useMessageDispatch = () => {
  const messageAndDispatch = useContext(NotificationContext)
  return messageAndDispatch[1]
}

export default NotificationContext