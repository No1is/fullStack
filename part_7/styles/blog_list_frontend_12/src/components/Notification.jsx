import { useSelector } from "react-redux";
import { Alert } from 'react-bootstrap'

const Notification = () => {
  const { message, error } = useSelector((state) => state.message);

  const variation = error ? 'danger' : 'success'

  if (!message) {
    return null;
  } else {
    return <Alert variant={variation}>{message}</Alert>
  }
};

export default Notification;
