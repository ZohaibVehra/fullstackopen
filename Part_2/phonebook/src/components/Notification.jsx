const Notification = ({ message}) => {
  const notificationStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  if(message !== null && message.includes('has already been removed from server')){
    notificationStyle.color = 'red'
  }else if(message !== null && message.includes('Person validation failed:')){
    notificationStyle.color = 'red'
  }

  if (message === null) {
    return null
  }

  return (
    <div style={notificationStyle}>
      {message}
    </div>
  )
}

export default Notification