//Backend component - productController.js

/*This file is responsible for implementing various admin features like fetching all/single products, perform CRUD operations on product data as well as implement the backend logic of reviews.*/

import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

import redis from "redis";
const redisClient = redis.createClient();

(async () => {
  await redisClient.connect();
})();

redisClient.on("connect", () => console.log("Redis Connected"));
redisClient.on("error", (err) => console.log("Redis Client Error", err));

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;

  const data = await redisClient.get(`products?${pageSize}`);
  if (data) {
    console.log("Redis Cache Hit -1");
    res.json({ products: JSON.parse(data) });
  } else {
    console.log("Redis Cache Miss -1");
    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};

    const count = await Product.countDocuments({ ...keyword });
    const products = await Product.find({ ...keyword })
      .limit(pageSize)
      .skip(pageSize * (page - 1));
    //Setting the cache data for the key products?pageSize
    await redisClient.setEx(
      `products?${pageSize}`,
      3600,
      JSON.stringify(products)
    );
    res.json({ products, page, pages: Math.ceil(count / pageSize) });
  }
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  // const product = await Product.findById(req.params.id);
  let PRODUCT;
  const data = await redisClient.get(`products_id:` + req.params.id);

  if (!data) {
    // When cache is empty
    // res.json(JSON.parse(data));
    console.log("Redis Cache Miss -2");
    const product = await Product.findById(req.params.id);
    PRODUCT = product;

    await redisClient.setEx(
      `products_id:` + req.params.id,
      3600,
      JSON.stringify(product)
    );
  } else {
    console.log("Redis Cache Hit -2");
    PRODUCT = data;
    return res.json(JSON.parse(PRODUCT));
  }

  console.log(PRODUCT);

  if (PRODUCT) {
    // res.json(product);
    res.json(JSON.parse(JSON.stringify(PRODUCT)));
  } else {
    res.status(404);
    throw new Error("Product not found");
  }

  // const product = await Product.findById(req.params.id)

  // if (product) {
  //   res.json(product)
  // } else {
  //   res.status(404)
  //   throw new Error('Product not found')
  // }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({ message: "Product removed" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "Sample name",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "Sample brand",
    category: "Sample category",
    countInStock: 0,
    numReviews: 0,
    description: "Sample description",
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Product already reviewed");
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);

    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: "Review added" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc    Get top rated products
// @route   GET /api/products/top
// @access  Public
const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3);

  res.json(products);
});

export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
};
