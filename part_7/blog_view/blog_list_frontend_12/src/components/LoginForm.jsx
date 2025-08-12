import { useSelector, useDispatch } from "react-redux";
import { setUsername, setPassword, loginUser } from "../reducers/userReducer";
import Notification from "./Notification";

const LoginForm = () => {
  const dispatch = useDispatch();
  const username = useSelector((state) => state.user.username);
  const password = useSelector((state) => state.user.password);

  const handleLogin = (event) => {
    event.preventDefault();

    try {
      dispatch(loginUser(username, password));

      dispatch(setUsername(""));
      dispatch(setPassword(""));
    } catch (exception) {}
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
            onChange={({ target }) => dispatch(setUsername(target.value))}
          />
        </div>
        <div>
          password
          <input
            data-testid="password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => dispatch(setPassword(target.value))}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default LoginForm;
