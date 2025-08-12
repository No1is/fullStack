import { useToggleValue, useToggleDispatch } from "../contexts/ToggleContext";
import BlogForm from "./BlogForm";

const Togglable = () => {
  const visible = useToggleValue();
  const dispatch = useToggleDispatch();

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    dispatch({ type: "TOGGLE" });
  };

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>new blog</button>
      </div>
      <div style={showWhenVisible}>
        <BlogForm />
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  );
};

export default Togglable;
