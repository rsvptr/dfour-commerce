//Frontend component - Message.js

//This file is responsible for implementing the error messages or any other kind of alert messages.


import React from 'react'
import { Alert } from 'react-bootstrap'

const Message = ({ variant, children }) => {
  return <Alert variant={variant}>{children}</Alert>
}

Message.defaultProps = {
  variant: 'info',
}

export default Message
