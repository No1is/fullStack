import { useSelector, useDispatch } from "react-redux";
import { setUsername, setPassword, loginUser } from "../reducers/userReducer";
import Notification from "./Notification";
import { Form, Button } from 'react-bootstrap'

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
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>Username:</Form.Label>
          <Form.Control
            data-testid="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => dispatch(setUsername(target.value))}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password:</Form.Label>
          <Form.Control
            data-testid="password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => dispatch(setPassword(target.value))}
          />
        </Form.Group>
        <Button variant='primary' type="submit">login</Button>
      </Form>
    </div>
  );
};

export default LoginForm;
