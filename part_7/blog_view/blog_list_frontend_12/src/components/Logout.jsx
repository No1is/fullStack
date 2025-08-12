import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "../reducers/messageReducer";
import { resetView } from "../reducers/toggleReducer";
import { clearForm } from '../reducers/blogFormReducer'
import { logout } from "../reducers/userReducer";
import blogService from "../services/blogs";

const Logout = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const handleLogOut = (event) => {
    event.preventDefault();

    window.localStorage.removeItem("loggedInUser");
    blogService.setToken(null);
    dispatch(logout());
    dispatch(resetView());
    dispatch(clearForm())
    dispatch(setNotification("you have ben logged out"));
  };
  if (!user) {
    return null;
  }

  return (
    <div>
      {user.name} logged in
      <button type="button" onClick={handleLogOut}>
        logout
      </button>
    </div>
  );
};

export default Logout;
