import { useSelector } from "react-redux";

const Notification = () => {
  const { message, error } = useSelector((state) => state.message);

  const messageStyle = {
    color: error ? "red" : "green",
    background: "lightgrey",
    borderStyle: "solid",
    borderRadius: 5,
    fontSize: 20,
    padding: 10,
    marginBottom: 10,
  };

  if (!message) {
    return null;
  } else {
    return <div style={messageStyle}>{message}</div>;
  }
};

export default Notification;
