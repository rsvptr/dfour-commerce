import path from "path";
import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import morgan from "morgan";
import YAML from "yamljs";
import swaggerUi from "swagger-ui-express";
import fsr from "file-stream-rotator";

// const fsr = require("file-stream-rotator");
//const swaggerUi = require("swagger-ui-express");
// var morgan = require('morgan')
// const fsr = require('file-stream-rotator');
//const YAML = require("yamljs");

const swaggerDocument = YAML.load("./backend/swagger.yaml");

import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";

import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
// Changes made to this file:
dotenv.config();

connectDB();

const app = express();


if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

morgan(':method :url :status :res[content-length] - :response-time ms')


let logsinfo = fsr.getStream({filename:"logs/server.log", frequency:'60m', verbose: true});
app.use(morgan('dev', {stream: logsinfo}))


app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
);

// THe APIs are mostly written in the Routes as it deals with the backend and the frontend uses the API to get the respective needed data

app.use(express.json());

//The APIs created are called here to summarize the order
//API calls the productroutes in the routescript
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);

// This the Configuration of the Paypal Client ID for the Sandbox

app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
); // GET api/config/paypal - Get Paypal client ID

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

// THese 2 Triggere the Error handling functions in the  errorMiddleware for custom errors
app.use(notFound);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

// Axios HTTP request from the backend to the frontend

export default app;