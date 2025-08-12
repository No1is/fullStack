import { useUserValue, useUserDispatch } from "../contexts/UserContext";
import UserContext from "../contexts/UserContext";
import { useContext } from "react";
import NotificationContext from "../contexts/NotificationContext";
import Notification from "./Notification";

const LoginForm = () => {
  const { loginUser } = useContext(UserContext);
  const { setNotification } = useContext(NotificationContext);
  const { username, password } = useUserValue();
  const dispatch = useUserDispatch();

  const handleLogin = async (event) => {
    event.preventDefault();

    const success = await loginUser(username, password);
    if (success) {
      dispatch({ type: "CLEAR" });
      setNotification(`${success.name} logged in`);
    } else {
      setNotification("wrong username or password", true);
    }
  };

  return (
    <div>
      <h1>log in to application</h1>
      <Notification />
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            data-testid="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) =>
              dispatch({ type: "USERNAME", payload: target.value })
            }
          />
        </div>
        <div>
          password
          <input
            data-testid="password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) =>
              dispatch({ type: "PASSWORD", payload: target.value })
            }
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default LoginForm;
