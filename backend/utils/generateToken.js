//Backend component - generateTokens.js

//This file is responsible for generating Users/tokens .

import jwt from 'jsonwebtoken'

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}

export default generateToken
