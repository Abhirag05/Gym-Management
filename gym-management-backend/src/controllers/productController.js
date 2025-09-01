const Product = require('../models/Product');
const path = require('path');
const fs = require('fs');

const productController = {
  // Create new product
  createProduct: async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No image uploaded" });
      }

      // For serverless deployment, store image as base64 or use cloud storage
      // For now, we'll store a placeholder since file system is not available
      const productData = {
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        category: req.body.category,
        stock: req.body.stock,
        brand: req.body.brand,
        flavors: req.body.flavors ? JSON.parse(req.body.flavors) : [],
        sizes: req.body.sizes ? JSON.parse(req.body.sizes) : [],
        imageUrl: req.file ? `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}` : null
      };

      const newProduct = new Product(productData);
      await newProduct.save();

      res.status(201).json({
        message: "Product added successfully",
        product: newProduct
      });
    } catch (error) {
      console.error("Product creation error:", error);
      res.status(500).json({ 
        message: "Failed to add product",
        error: error.message
      });
    }
  },

  // Get all products
  getAllProducts: async (req, res) => {
    try {
      const products = await Product.find().sort({ createdAt: -1 });
      res.json(products);
    } catch (error) {
      console.error('Get products error:', error);
      res.status(500).json({ message: "Error fetching products", error: error.message });
    }
  },

  // Get product by ID
  getProductById: async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      console.error("Error fetching product:", error);
      res.status(500).json({ 
        message: "Error fetching product details",
        error: error.message
      });
    }
  },

  // Update product
  updateProduct: async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      const updateData = {
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        category: req.body.category,
        stock: req.body.stock,
        brand: req.body.brand,
        flavors: req.body.flavors ? JSON.parse(req.body.flavors) : [],
        sizes: req.body.sizes ? JSON.parse(req.body.sizes) : []
      };

      // Handle image update if new image is provided
      if (req.file) {
        // For serverless deployment, store image as base64
        updateData.imageUrl = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
      }

      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true, runValidators: true }
      );

      res.json({
        message: "Product updated successfully",
        product: updatedProduct
      });
    } catch (error) {
      console.error("Product update error:", error);
      res.status(500).json({ 
        message: "Failed to update product",
        error: error.message
      });
    }
  },

  // Delete product
  deleteProduct: async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      // Delete image file if exists
      if (product.imageUrl) {
        const imagePath = path.join(__dirname, '../../uploads', path.basename(product.imageUrl));
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      }

      await Product.findByIdAndDelete(req.params.id);
      res.json({ message: "Product deleted successfully" });
    } catch (error) {
      console.error('Delete product error:', error);
      res.status(500).json({ message: "Delete failed", error: error.message });
    }
  }
};

module.exports = productController;
