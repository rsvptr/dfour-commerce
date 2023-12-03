//Backend component - orderRoutes.js

//This file is responsible for implementing the routes of all orders.

import express from 'express'
const router = express.Router()
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
} from '../controllers/orderController.js'

import { protect, admin } from '../middleware/authMiddleware.js'

 

router.route('/')
.post(protect, addOrderItems)    // POST api/orders - Add order items
.get(protect, admin, getOrders) // GET api/orders - Get all orders

router.route('/myorders').get(protect, getMyOrders)  // GET api/orders/myorders - Get all orders of logged in user

router.route('/:id').get(protect, getOrderById) // GET api/orders/:id - Get order by ID

router.route('/:id/pay').put(protect, updateOrderToPaid) // PUT api/orders/:id/pay - Update order to paid

router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered) // PUT api/orders/:id/deliver - Update order to delivered

export default router
