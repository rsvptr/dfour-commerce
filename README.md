# DFour-Commerce
## Your e-commerce venture starts here!

DFour-Commerce is a custom eCommerce platform built using JavaScript, React, Redux, Express, & MongoDB. It features a full-featured shopping cart with PayPal & credit/debit payments, customer management, products & orders, product rating & review system, product search, and more. This project, spanning two semesters, was completed for our full-stack development track offered by **IIIT Sri City** under the supervision of **Dr. Himangshu Sarma**.

## Features
- Full-featured shopping cart
- Product reviews and ratings
- Top products carousel
- Product pagination
- Product search feature
- User profile with orders
- Admin product management
- Admin user management
- Admin order details page
- Admin inventory visualization
- Mark orders as delivered option
- Checkout process (shipping, payment method, etc.)
- PayPal / credit card integration
- Database seeding (products & users)

## Tech stack

DFour-Commerce uses the following tech stacks:

- [ReactJS] - JS library for building user interfaces based on UI components
- [Redux] - Frontend state management for applications
- [NodeJS] - Backend JavaScript runtime environment
- [ExpressJS] - Backend framework for Node.js
- [MongoDB] - Database used to store various application data
- [Redis] - Caching database used to improve performance
- [Docker] - Used to containerize the application

## Installation

**Note**: DFour-Commerce requires [Node.js](https://nodejs.org/) v14+ and [npm](https://www.npmjs.com/) v6+.

**a. Clone the repository** 
```sh
git clone https://github.com/rsvptr/dfour-commerce
```
**b. Set the .env variables:**
```sh
NODE_ENV = development
PORT = 5000
MONGO_URI = your MongoDB URI 
JWT_SECRET = 'abc123'
PAYPAL_CLIENT_ID = your PayPal client ID 
```
**c. Install all dependencies:**
```sh
npm install
cd frontend
npm install
```
**d. Run:**
```sh
# Run frontend (:3000) & backend (:5000)
npm run dev

# Run backend only
npm run server
```
## Deployment
```sh
# Create frontend prod build
cd frontend
npm run build
```
## Database Seeding
Use these commands to seed the database with sample data or to destroy all data.
```sh
# Import data
npm run data:import

# Destroy data
npm run data:destroy
```
**Sample user login information (for testing):**
```sh
admin@example.com (Admin)
123456

john@example.com (Customer)
123456

jane@example.com (Customer)
123456
```

## Website Demonstration
For a comprehensive demonstration of DFour-Commerce showcasing all the features of the website as part of our final review submission to our professors, please watch our video: [DFour-Commerce Demo](https://www.youtube.com/watch?v=acmCQFKna54). It provides a detailed walkthrough of the application, highlighting its functionality and user interface. In case the link is inaccessible, a copy of the video is available on the repository.

## Documentation
For more detailed information, please refer to the documentation included in this repository.

## Packages

DFour-Commerce is extended with the following packages:

### Client-side npm packages
- axios
- mongodb
- react
- react-bootstrap
- react-dom
- react-helmet
- react-magnifier
- react-paypal-button-v2
- react-redux
- react-router-bootstrap
- react-router-dom
- react-scripts
- recharts
- redux
- redux-devtools-extension
- redux-thunk
- url

### Server-side npm packages
- body-parser
- dotenv
- cors
- express
- nodemon
- redisClient
- jsonwebtoken
- mongoose
- morgan
- multer
- uuid
- swagger-ui-express
- yamljs

## Building the React App

For production release (client side app):

```sh
npm run build
```
To run it with Docker:
```sh
npm run build
```

## Contributors
### Group - 33

 - Logu R (S20190010111)  
 - Romy Savin Peter ( S20190010153)  
 - Muzakkir Fazal ( S20190010121)  
 - Krushang Sirikonda ( S20190010164)  
 - Abdulrahman Syed (S20190010002)