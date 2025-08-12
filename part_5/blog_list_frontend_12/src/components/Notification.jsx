const Notification = ({ message, error }) => {

  const messageStyle = {
    color: error? 'red': 'green',
    background: 'lightgrey',
    borderStyle: 'solid',
    borderRadius: 5,
    fontSize: 20,
    padding: 10,
    marginBottom: 10
  }

  if (!message && !error) {
    return null
  } else {
    return (
      <div style={messageStyle}>{message || error}</div>
    )
  }
}

export default Notification
