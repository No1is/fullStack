import UserContext from "../contexts/UserContext";
import { useUserValue } from "../contexts/UserContext";
import { useContext } from "react";
import NotificationContext from "../contexts/NotificationContext";
import { useShowblogDispatch } from "../contexts/ShowblogContext";
import { useToggleDispatch } from "../contexts/ToggleContext";

const Logout = () => {
  const dispatchShowblog = useShowblogDispatch();
  const dispatchToggle = useToggleDispatch();
  const user = useUserValue().user;
  const { logOutUser } = useContext(UserContext);
  const { setNotification } = useContext(NotificationContext);

  const handleLogOut = (event) => {
    event.preventDefault();

    logOutUser();
    dispatchShowblog({ type: "RESET" });
    dispatchToggle({ type: "RESET" });
    setNotification("you have been logged out");
  };

  if (!user) {
    return null;
  }

  return (
    <div>
      {user.name} logged in
      <div>
        <button type="button" onClick={handleLogOut}>
          logout
        </button>
      </div>
    </div>
  );
};

export default Logout;
