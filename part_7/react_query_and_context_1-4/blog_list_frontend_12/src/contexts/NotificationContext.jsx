import { createContext, useReducer, useContext } from "react";

const initialState = {
  message: null,
  error: false,
};

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "MSG":
      return {
        message: action.payload.message,
        error: action.payload.error,
      };
    case "CLEAR":
      return {
        message: null,
        error: false,
      };
    default:
      return state;
  }
};

const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
  const [message, messageDispatch] = useReducer(
    notificationReducer,
    initialState,
  );

  const setNotification = (message, error = false) => {
    messageDispatch({
      type: "MSG",
      payload: { message, error },
    });

    setTimeout(() => {
      messageDispatch({
        type: "CLEAR",
      });
    }, 5000);
  };

  return (
    <NotificationContext.Provider
      value={{
        ...message,
        setNotification,
      }}
    >
      {props.children}
    </NotificationContext.Provider>
  );
};

export const useMessageValue = () => {
  const { message, error } = useContext(NotificationContext);
  return { message, error };
};

export default NotificationContext;
