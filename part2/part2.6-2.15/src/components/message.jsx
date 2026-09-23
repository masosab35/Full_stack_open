const message = ({message}) => {
    const errorstyle = {
        color: 'red',
        fontStyle: 'italic',
        fontSize: 20,
        backgroundColor: 'lightgrey',
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }
    const sucessstyle = {
        color: 'green',
        fontStyle: 'italic',
        fontSize: 20,
        backgroundColor: 'lightgrey',
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }
    if (message === null){
        return null
    }
    else{
        return (
            <div style={message.type === 'error' ? errorstyle : sucessstyle}>
                <p>{message.content}</p>
            </div>
        )
    }
}

export default message