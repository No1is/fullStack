const Notification = ({ message }) => {
    const errorStyle = {
        color: 'green',
        background: 'lightgrey',
        borderStyle: 'solid',
        borderRadius: 5,
        fontSize: 20,
        padding: 10,
        marginBottom: 10 
    }

    if (message === null) {
        return null
    } else {
        return(
            <div style={errorStyle}>{message}</div>
        )
    }
}

export default Notification