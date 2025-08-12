import { createContext, useReducer, useContext } from "react";

const toggleReducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE":
      return !state;
    case "RESET":
      return false;
    default:
      return state;
  }
};

const ToggleContext = createContext();

export const ToggleContextProvider = (props) => {
  const [visibility, toggleDispatch] = useReducer(toggleReducer, false);

  return (
    <ToggleContext.Provider value={[visibility, toggleDispatch]}>
      {props.children}
    </ToggleContext.Provider>
  );
};

export const useToggleValue = () => {
  const visibilityAndDispatch = useContext(ToggleContext);
  return visibilityAndDispatch[0];
};

export const useToggleDispatch = () => {
  const visibilityAndDispatch = useContext(ToggleContext);
  return visibilityAndDispatch[1];
};

export default ToggleContext;
