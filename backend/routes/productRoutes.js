//Backend component - productRoutes.js

//This file is responsible for implementing the routes of all the product CRUD operations (performed by the admin).

import express from 'express'
const router = express.Router()
import {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
} from '../controllers/productController.js'
import { protect, admin } from '../middleware/authMiddleware.js'




router.route('/')    
.get(getProducts) // GET /api/products - Get all products
.post(protect, admin, createProduct) // POST /api/products - Create new product


router.route('/:id/reviews')  
.post(protect, createProductReview) // POST /api/products/:id/reviews - Create new product review

router.get('/top', getTopProducts) // GET /api/products/top - Get top products


router
  .route('/:id')
  .get(getProductById) // GET /api/products/:id - Get product by ID
  .delete(protect, admin, deleteProduct) // DELETE /api/products/:id - Delete product by ID
  .put(protect, admin, updateProduct) // PUT /api/products/:id - Update product by ID

export default router
