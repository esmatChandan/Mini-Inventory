const express = require('express');
const Product = require('../model/product.js');

const router = express.Router();

// POST /products - Add a new product
router.post('/products', async (req, res) => {
  try {
    const { name, category, price, inStock } = req.body;
    const product = new Product({ name, category, price, inStock });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET /products - Get all products with optional filters
router.get('/products', async (req, res) => {
  try {
    const { category, inStock } = req.query;
    const filter = {};

    if (category) filter.category = category;
    if (inStock !== undefined) filter.inStock = inStock === 'true';

    const products = await Product.find(filter);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;