import { useSelector, useDispatch } from "react-redux";
import { toggleView } from "../reducers/toggleReducer";
import BlogForm from "./BlogForm";
import { Button } from 'react-bootstrap'

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
      <h2>blogs</h2>
      <div style={hideWhenVisible}>
        <Button variant='secondary' onClick={toggleVisibility}>New Blog</Button>
      </div>
      <div style={showWhenVisible}>
        <BlogForm />
        <Button variant="dark" onClick={toggleVisibility}>Cancel</Button>
      </div>
    </div>
  );
};

export default Togglable;
