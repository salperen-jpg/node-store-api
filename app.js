const express = require('express');
const app = express();
const connectDB = require('./db/connect');
// dotenv
require('dotenv').config();
// async errors

const notFound = require('./middleware/not-found');
const errorMiddleware = require('./middleware/error-handler');
const productsRouter = require('./routes/products');

// middleware
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send("<h1>Store api</h1><a href='/api/v1/products'>Products</a>");
});

app.use('/api/v1/products', productsRouter);

// Products route

app.use(notFound);
app.use(errorMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log(`Server is listening on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
