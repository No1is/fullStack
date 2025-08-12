import { createContext, useReducer, useContext } from "react";

const initialState = {};

const showblogReducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE":
      const id = action.payload;
      return {
        ...state,
        [id]: !state[id],
      };
    case "RESET":
      return {};
    default:
      return state;
  }
};

const ShowblogContext = createContext();

export const ShowblogContextProvider = (props) => {
  const [showBlog, toggleDispatch] = useReducer(showblogReducer, initialState);

  return (
    <ShowblogContext.Provider value={[showBlog, toggleDispatch]}>
      {props.children}
    </ShowblogContext.Provider>
  );
};

export const useShowblogValue = () => {
  const showblogAndDispatch = useContext(ShowblogContext);
  return showblogAndDispatch[0];
};

export const useShowblogDispatch = () => {
  const showblogAndDispatch = useContext(ShowblogContext);
  return showblogAndDispatch[1];
};

export default ShowblogContext;
