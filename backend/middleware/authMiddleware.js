//Backend component - authMiddleware.js

//This file is responsible for validating user/tokens.



// async handler Simple middleware for handling exceptions inside of async express routes and passing them to your express error handlers.


import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

// Reason for this validate the token is to make sure that the user is logged in.

const protect = asyncHandler(async (req, res, next) => {
  let token
// THe Token is sent as Authorization piece in the headers 
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1]

      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      req.user = await User.findById(decoded.id).select('-password')

      next()
    } catch (error) {
      console.error(error)
      res.status(401)
      throw new Error('Not authorized, token failed')
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('Not authorized, no token')
  }
})

// checks if the user is an admin, otherwise thow unautherised error

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next()
  } else {
    res.status(401)
    throw new Error('Not authorized as an admin')
  }
}

export { protect, admin }
