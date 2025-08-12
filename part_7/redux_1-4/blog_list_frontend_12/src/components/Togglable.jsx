import { useSelector, useDispatch } from "react-redux";
import { toggleView } from "../reducers/toggleReducer";
import BlogForm from "./BlogForm";

const Togglable = () => {
  const visible = useSelector((state) => state.visible);
  const dispatch = useDispatch();

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    dispatch(toggleView());
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
