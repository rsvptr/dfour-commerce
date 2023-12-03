//Backend component - userRoutes.js

//This file is responsible for implementing the routes of all the user login  operations.

import express from 'express'
const router = express.Router()
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} from '../controllers/userController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/')
.post(registerUser) // POST api/users - Register new user
.get(protect, admin, getUsers) // GET api/users - Get all users




router.post('/login', authUser)   // POST api/users/login - Login user



router.route('/profile')
  .get(protect, getUserProfile)  // GET api/users/profile - Get user profile
  .put(protect, updateUserProfile) // PUT api/users/profile - Update user profile

router.route('/:id')
  .delete(protect, admin, deleteUser) // DELETE api/users/:id - Delete user by ID
  .get(protect, admin, getUserById) // GET api/users/:id - Get user by ID
  .put(protect, admin, updateUser) // PUT api/users/:id - Update user by ID

export default router
