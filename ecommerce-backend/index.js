const express = require("express");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const app = express();
const cors = require('cors');
app.use(cors());

app.use(express.json());


app.get("/", (req, res) => {
  res.send("E-commerce API is running");
});


app.post('/users', async (req, res) => {
    const { email, name, password } = req.body;
    try {
      const user = await prisma.user.create({
        data: { email, name, password },
      });
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Get all users
  app.get('/users', async (req, res) => {
    try {
      const users = await prisma.user.findMany();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Create a new product
  app.post('/products', async (req, res) => {
    const { name, price, quantity } = req.body;
    try {
      const product = await prisma.product.create({
        data: { name, price, quantity },
      });
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Get all products
  app.get('/products', async (req, res) => {
    try {
      const products = await prisma.product.findMany();
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Create a new order
  app.post('/orders', async (req, res) => {
    const { userId, productId, quantity } = req.body;
    try {
      const order = await prisma.order.create({
        data: { userId, productId, quantity },
      });
      res.json(order);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Get all orders
  app.get('/orders', async (req, res) => {
    try {
      const orders = await prisma.order.findMany({
        include: {
          user: true,
          product: true,
        },
      });
      res.json(orders);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  app.listen(3000, () => {
    console.log(`Server is running on http://localhost:3000`);
  });